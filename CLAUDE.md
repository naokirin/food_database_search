# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリでコードを扱う際のガイダンスを提供します。

## プロジェクト概要

食品のカロリー、炭水化物、脂質、タンパク質の量を調べられるWebアプリケーション。
文部科学省の食品成分データベース（日本食品標準成分表）をベースにしたSvelteKit/TypeScriptアプリ。

## 開発コマンド

```bash
# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# プレビュー
npm run preview

# 型チェック
npm run check

# 型チェック（監視モード）
npm run check:watch
```

## プロジェクト構造

- **フレームワーク:** SvelteKit 2.16+ with TypeScript
- **テンプレート:** Minimal template (no additional add-ons)
- **データソース:** 文科省食品成分データベース (xlsx形式)
- **主要ディレクトリ:**
  - `src/routes/` - ページコンポーネント
  - `src/lib/` - 共通ライブラリ・コンポーネント
  - `static/` - 静的ファイル

## データソース

- **URL:** https://www.mext.go.jp/content/20230428-mxt_kagsei-mext_00001_012.xlsx
- **内容:** 日本食品標準成分表2020年版（八訂）
- **注意:** Excelファイルは直接読み込めないため、CSV変換またはAPI化が必要

## Gitワークフロー

- **現在のブランチ:** `feature/create_project`
- **リポジトリタイプ:** Git worktree (`/Users/naoki/work/syokusagashi/.git/` を参照)
- **メインリポジトリ:** `/Users/naoki/work/syokusagashi/` に配置