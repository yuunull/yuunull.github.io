---
title: "不要なブランチを削除するようにした"
date: "2024-06-20"
description: "不要なブランチを削除するスクリプトを作成した。"
---

## 不要なブランチを手動で削除するのがめんどくさい

勉強用に[frontend-practice](https://github.com/yuunull/frontend-practice)というリポジトリを作成して毎日以下のフォーマットでブランチを作成して作業しています。

```
// ブランチ名
feature_YYYYMMDD
```

これを削除するのがめんどい。

## スクリプトを作成して一括削除したい

このコマンドを追加して削除するようにしました。  
マージ時に自動削除する設定もあるけど、このようなやり方もできるようです。  
もっといいやり方あると思うので適宜変更していきます

```js
"scripts": {
    "clean-merged-branches": "npm run clean-merged-remote-branches && npm run clean-merged-local-branches",
    "clean-merged-remote-branches": "git branch -r --merged main | grep -v -e main | sed -e 's% *origin/%%' | xargs -I% git push --delete origin %",
    "clean-merged-local-branches": "git branch --merged main | grep -vE '^\\*|main$|develop$' | xargs -I % git branch -d %"
  }
```

## 実行

削除するときは以下のコマンドを実行します。

```
$ npm run clean-merged-branches
```
