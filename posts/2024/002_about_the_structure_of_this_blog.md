---
title: "このブログの構成について"
date: "2024-06-22"
description: "このブログの構成について"
---

## ブログを始めて作った

Next.js を使ってブログを作ってみようと思った。  
どのようにして作ったか、どのような構成にしたかを記録として残しておく

## 使った技術、ライブラリ

- Next.js
- react-markdown
- github-markdown-css
- rehype-highlight
- remark-gfm
- gray-matter

Nex.js は案件で使うことがあるのでそれの勉強をしたいと思って利用しました。  
（あまり勉強になってない使い方だと思うけど・・・）

それ以外のライブラリはマークダウンで記事を管理してブログを更新したいと思って追加したやつです。

## Next.js で SSG できるサイトを生成

今回はブログで更新頻度の少ない静的ページになると思うので SSG で作ることにしました。

```
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

TypeScript は使いたいので Yes  
Tailwind は使用せずスタイルあてたいので No  
App Router は使わないので No  
みたいな設定にしました。

## ディレクトリ構成

記事は posts フォルダを作成して md ファイルをそこに溜めていくやり方にしたかったので以下のようにしました。

```
root
├posts
│ ├2024
│ └2025
├public
└src
  ├pages
  │ ├blogs
  │ │ ├[year]
  │ │ │ └[slug].tsx
  │ │ └index.tsx
  │ └index.tsx
  └styles
```

## 記事一覧ページの作成

`pages/index.tsx` に記事の一覧ページを作成します。  
SSG を利用するので `getStaticProps` を使っていきます。  
ここでは posts フォルダから md ファイルを取得しタイトル、日付、説明のメタデータを取得しています。  
そして記事の作成日の新しい順にソートしています。

```typescript
export const getStaticProps = () => {
  const years = fs.readdirSync("posts");
  let posts: BlogMeta[] = [];

  years.forEach((year) => {
    const yearDir = path.join("posts", year);
    const files = fs.readdirSync(yearDir);

    files.forEach((fileName) => {
      const slug = `${year}/${fileName.replace(/\.md$/, "")}`;
      const filePath = path.join(yearDir, fileName);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      posts.push({
        frontMatter: {
          title: data.title,
          date: data.date,
          description: data.description,
        },
        slug,
      });
    });
  });

  posts.sort(
    (a, b) =>
      new Date(b.frontMatter.date).getTime() -
      new Date(a.frontMatter.date).getTime()
  );

  return {
    props: {
      posts,
    },
  };
};
```

上記で取得したデータをもとにタイトルを表示する部分を作成します。  
`/blogs/${post.slug}`でそれぞれの md ファイルのファイル名に応じたルーティングを指定しています。

```typescript
export default function Blogs({ posts }: Props) {
  return (
    <>
      <div className="wrapper">
        {posts?.map((post) => (
          <div key={post.slug} className={`${styles.BlogsContainer}`}>
            <ul className={`${styles.BlogsList}`}>
              <li className={`${styles.BlogsListDate}`}>
                {post.frontMatter.date}
              </li>
              <li className={`${styles.BlogsListTitle}`}>
                <Link href={`/blogs/${post.slug}`}>
                  {post.frontMatter.title}
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
```

## 記事ページの作成

`pages/blogs/[year]/[slug].tsx`にファイルを作成します。  
これで年単位でファイルごとのルーティングが実現できます。  
それぞれのページを作成するため`getStaticPaths`を使っています。  
`getStaticPaths`ですべての記事を取得し、`getStaticProps`でパスごとにコンテンツを取得し  
コンポーネントに渡しています。

```typescript
export async function getStaticProps(
  context: GetStaticPropsContext<{ year: string; slug: string }>
) {
  const { year, slug } = context.params!;
  const filePath = path.join("posts", year, `${slug}.md`);
  const file = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(file);
  return { props: { frontMatter: data, content } };
}

export async function getStaticPaths() {
  const years = fs.readdirSync("posts");
  let paths: { params: { year: string; slug: string } }[] = [];

  years.forEach((year) => {
    const yearDir = path.join("posts", year);
    const files = fs.readdirSync(yearDir);

    files.forEach((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      paths.push({
        params: {
          year,
          slug,
        },
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
}
```

本文は以下のようにライブラリを使ってマークダウン表示させました。

```typescript
export default function Post({ frontMatter, content }: BlogContents) {
  return (
    <div className="wrapper">
      <h1 className="blog-title">{frontMatter.title}</h1>
      <article className="markdown-body">
        <Markdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
          {content}
        </Markdown>
      </article>
    </div>
  );
}
```

## これから

- ページが増えるとビルドやリリースが遅くなると思うのでそこの改善
- コードハイライトをきちんとしたい
- OGP を各ページに設定したい
- 各記事ごとにサムネイル画像を設定できるようにしたい
- スタイルの調整、リファクタリングしたい
- 別なライブラリ使って同じものを作ってみたい（Vite, Astro など）

## ソースコード

https://github.com/yuunull/yuunull.github.io
