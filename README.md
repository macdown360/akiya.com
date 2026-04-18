# akiya.com

Airbnb風のデザインガイドをもとに作成した、日本各地の空き家と買い手をつなぐマッチングプラットフォームのプロトタイプです。

## 機能

- 空き家の一覧表示（カードUI）
- キーワード + 地域 + 目的カテゴリでの検索/絞り込み
- 買い手条件（予算、面積、用途、リノベ許容）によるマッチング提案
- モバイル/タブレット/デスクトップ対応のレスポンシブレイアウト

## ファイル構成

- `index.html`: 画面の構造
- `styles.css`: DESIGN.mdに沿ったデザイン実装
- `app.js`: データ定義、検索・絞り込み・マッチングロジック

## 起動方法

### 1. ローカルでファイルを直接開く

`index.html` をブラウザで開くと動作確認できます。

### 2. 簡易サーバーで起動（推奨）

```bash
python3 -m http.server 8000
```

次にブラウザで `http://localhost:8000` を開いてください。

## GitHub Pagesで公開する

このリポジトリには、`main` ブランチへ push したときに自動でGitHub Pagesへ公開するワークフローを追加しています。

### 1. リポジトリをGitHubへpushする

```bash
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

### 2. GitHub Pagesを有効化する

GitHubのリポジトリ設定で以下を確認してください。

- `Settings` → `Pages`
- `Source` は `GitHub Actions` を選択

### 3. 公開URLを確認する

通常は以下のURLで公開されます。

- `https://macdown360.github.io/akiya.com/`

初回公開は数十秒から数分かかることがあります。Actionsタブで `Deploy to GitHub Pages` ワークフローが成功していれば公開完了です。

### 4. 独自ドメインを使う場合

独自ドメインを使う場合は、GitHubの `Settings` → `Pages` でカスタムドメインを設定し、DNS側でGitHub Pages向けのレコードを追加してください。