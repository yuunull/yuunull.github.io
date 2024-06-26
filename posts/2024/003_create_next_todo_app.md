---
title: "Next.jsのApp RouterでTodoアプリを作る"
date: "2024-06-26"
description: "Next.jsのApp RouterでTodoアプリを作る"
---

## はじめに

Next.js の App Router を使ってみたくて Todo アプリを作ってみました。  
普段触ることのない技術も使ってインプット多めにしました。

※機能しかないので見た目は適当です。

## 使った技術、ライブラリ

- Next.js（App Router）
- Prisma
- TypeScript
- Docker
- postgresql

## Next.js でサイトを生成

```bash
$ npx create-next-app@latest

What is your project named? my-app
Would you like to use TypeScript? Yes
Would you like to use ESLint? Yes
Would you like to use Tailwind CSS? No
Would you like to use `src/` directory? Yes
Would you like to use App Router? (recommended) No
Would you like to customize the default import alias (@/*)? No
What import alias would you like configured? @/*
```

## DB の準備

#### Docker Desktop のインストール

[このサイト](https://www.docker.com/ja-jp/products/docker-desktop/)から環境に合わせたものをインストールする。

#### Dockerfile の作成

```yaml
# .docker/docker-compose.yml
version: "3.8"

services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

#### 環境変数の設定

`.env`ファイルに以下を追加

```makefile
# 適宜内容は変更してください。
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=mydatabase
```

#### 起動確認

```bash
$ docker-compose up -d
```

DB の起動ができていれば OK!

## Prisma の設定とマイグレーション

#### 必要パッケージのインストール

```bash
$ npm install @prisma/client

$ npm install prisma --save-dev
```

#### Prisma の初期化

```bash
npx prisma init
```

#### `prisma/schema.prisma`ファイルを編集して、データベース接続を設定

```js
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
}
```

#### `.env`ファイルにデータベース URL を追加

```makefile
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

#### Prisma のマイグレーションを実行

```bash
$ npx prisma migrate dev --name init
```

Todo テーブルのマイグレーションに成功していれば OK!

#### 確認

Prisma studio という GUI でデータベースを操作する機能もあるので、  
ちゃんとテーブルが追加されているかこの機能で確認します。

```bash
npx prisma studio
```

## Next.js で API ルートの作成

- `src/app/api/todos/route.ts`を作成する。
- CRUD 操作の処理を記述する。

[Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)を参考に作成した。

```typescript
// src/app/api/todos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  const newTodo = await prisma.todo.create({
    data: { title },
  });
  return NextResponse.json(newTodo, { status: 201 });
}
```

## フロントエンドの作成

#### Todo リストを表示するコンポーネントの作成

※"use client"を記載しないとエラーになります。  
https://nextjs.org/docs/app/building-your-application/rendering/client-components#using-client-components-in-nextjs

```typescript
// src/components/todoList.tsx
"use client";

import { useState, useEffect } from "react";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default TodoList;
```

```typescript
// src/app/page.tsx
import TodoList from "@/components/todoList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <TodoList />
      </div>
    </main>
  );
}
```

## おわりに

これで Todo のデータを DB から取得して画面に表示する部分が完成しました。  
継続して機能の作成は続けますが記事はここまでにします。  
また気づきなど別記事でアウトプットしていきます!!

[ソースコード](https://github.com/yuunull/nextjs-todo-app)
