# 食品栄養成分検索

食品の栄養成分を簡単に検索できるWebアプリケーションです。日本食品標準成分表（八訂）増補2023年のデータを使用して、食品100gあたりの栄養成分を表示します。

## 機能

- **食品検索**: 食品名を入力して栄養成分を検索
- **栄養成分表示**: エネルギー、タンパク質、脂質、炭水化物を表示
- **レスポンシブデザイン**: デスクトップ、タブレット、モバイルに対応
- **リアルタイム検索**: 入力に応じて即座に検索結果を表示

## 技術スタック

- **フロントエンド**: Svelte 5 + SvelteKit
- **ビルドツール**: Vite
- **言語**: TypeScript
- **データ**: CSV形式の食品栄養成分データ

## 実行方法

### 前提条件

- Node.js (v18以上)
- npm

### インストール

1. リポジトリをクローン
```bash
git clone https://github.com/naokirin/food_database_search.git
cd food_database_search
```

2. 依存関係をインストール
```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

開発サーバーが起動したら、ブラウザで `http://localhost:5173` にアクセスしてください。

### ビルド

本番用ビルドを作成する場合：

```bash
npm run build
```

### プレビュー

ビルドされたアプリケーションをプレビューする場合：

```bash
npm run preview
```

## プロジェクト構造

```
syokusagashi/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   └── FoodSearch.svelte    # メインの検索コンポーネント
│   │   ├── foodData.ts              # 食品データの読み込み・検索ロジック
│   │   └── types.ts                 # TypeScript型定義
│   └── routes/
│       └── +page.svelte             # メインページ
├── static/
│   └── food_database.csv            # 食品栄養成分データ
└── package.json
```

## データソース

このアプリケーションは以下のデータを使用しています：

- **日本食品標準成分表（八訂）増補2023年**
- 文部科学省が提供する公的な食品成分データベース
- データファイル: `static/food_database.csv`

**重要**: このプロジェクトのソフトウェア部分はMITライセンスですが、`static/food_database.csv`に含まれる食品成分データは日本食品標準成分表（八訂）増補2023年に基づいており、文部科学省の著作権に帰属します。データの利用については文部科学省の利用規約に従ってください。

## ライセンス

このプロジェクトのソフトウェア部分は [MIT License](LICENSE) の下で公開されています。

**データファイルについて**: `static/food_database.csv` に含まれる食品成分データは、日本食品標準成分表（八訂）増補2023年（文部科学省）に基づいており、文部科学省の著作権に帰属します。詳細は [static/DATA_LICENSE.md](static/DATA_LICENSE.md) を参照してください。

```

## 開発者

- **作成者**: naokirin
