# ガジェットスペック比較ナビ

Astro + Tailwind CSS で構築した、ガジェット・家電のアフィリエイト比較ブログです。

## 技術スタック

| 項目 | 内容 |
| --- | --- |
| フレームワーク | Astro 5（静的サイト生成） |
| スタイリング | Tailwind CSS 4（`@tailwindcss/vite`） |
| 本文スタイル | `@tailwindcss/typography` |
| 記事ソース | `src/content/blog/*.md`（Content Collections + glob loader） |
| デザイン | Apple 公式サイト（apple.com）のデザイントークン準拠 |

## デザインについて

配色・タイポグラフィ・形状は Apple 公式サイトを参照しています。値は `apple.com` のグローバルナビ用スタイルシート（`ac-globalnav.built.css`）およびマーケティングページから採取し、`src/styles/global.css` の `@theme` に定義しています。

| トークン | 値 | 用途 |
| --- | --- | --- |
| `--color-ink` | `#1d1d1f` | 見出し・本文 |
| `--color-ink-2` | `#6e6e73` | 補足テキスト |
| `--color-ink-3` | `#86868b` | 注釈・キャプション |
| `--color-surface` | `#f5f5f7` | セクション背景・タイル |
| `--color-hairline` | `#d2d2d7` | 1px 罫線 |
| `--color-nav` | `rgb(0 0 0 / 0.92)` | グローバルナビ |
| `--color-blue` | `#0071e3` | 主ボタン |
| `--color-blue-hover` | `#0077ed` | 主ボタン hover |
| `--color-link` | `#0066cc` | テキストリンク |
| `--radius-tile` | `18px` | カード・タイル |

その他の準拠ポイント:

- **グローバルナビ** — 高さ 44px、`backdrop-filter` 併用の半透明黒、リンクは 12px・`letter-spacing: -0.01em`・`opacity: .8`（hover で 1）
- **ボタン** — pill 形状（`border-radius: 980px` = `rounded-full`）。主ボタンは塗り、副ボタンは枠線
- **見出し** — `font-weight: 600`（bold ではなく semibold）、`letter-spacing: -0.015em`
- **本文** — 17px / `line-height: 1.47`
- **レイアウト** — コンテンツ幅 980px、本文カラム 692px、中央揃え
- **カテゴリー表示** — 面ではなく色文字（Apple のマーケティングページの「アイブロウ」に倣う）。色は `src/consts.ts` の `CATEGORY_COLORS`

なお **Amazon / 楽天ボタンだけは例外**で、形状は Apple の pill ボタンに揃えつつ、色はストアの識別性を優先してブランドカラー（Amazon = オレンジ `#ff9900` + 濃色文字 / 楽天 = レッド `#bf0000` + 白文字）を使っています。色は `src/styles/global.css` の `--color-amazon` / `--color-rakuten` で変更できます。

## セットアップ

```bash
npm install     # 導入済み
npm run dev     # http://localhost:4321
npm run build   # dist/ に静的出力
npm run preview # ビルド結果の確認
```

## ディレクトリ構成

```
src/
├── components/
│   ├── AffiliateButtons.astro  # Amazon / 楽天ボタン
│   ├── SpecTable.astro         # スペック比較表
│   ├── ArticleCard.astro       # 記事カード
│   ├── CategoryBadge.astro     # カテゴリーバッジ
│   ├── FormattedDate.astro     # 日付表示
│   ├── BaseHead.astro          # meta / OGP
│   ├── Header.astro
│   └── Footer.astro
├── content/blog/               # 記事の Markdown はここに追加
├── layouts/
│   ├── BaseLayout.astro
│   └── PageLayout.astro        # 固定ページ（プライバシー・お問い合わせ）用
├── pages/
│   ├── index.astro             # トップ (/)
│   ├── privacy.astro           # プライバシーポリシー (/privacy)
│   ├── contact.astro           # お問い合わせ (/contact)
│   └── blog/[slug].astro       # 記事詳細 (/blog/[slug])
├── styles/global.css           # Tailwind 読み込み + ブランドカラー定義
├── content.config.ts           # frontmatter のスキーマ定義
└── consts.ts                   # サイト名・ナビ・フッターリンク・連絡先・カテゴリー色
```

## 記事の書き方

`src/content/blog/` に `.md` を追加するだけでトップページと `/blog/<ファイル名>/` に反映されます。

### Frontmatter

```yaml
---
# --- 必須 ---
title: '記事タイトル'
description: '記事の要約（一覧カードと meta description に使用）'
pubDate: 2026-08-10
category: 'イヤホン'

# --- 任意 ---
amazonUrl: 'https://www.amazon.co.jp/dp/XXXX?tag=your-amazon-id-22'
rakutenUrl: 'https://hb.afl.rakuten.co.jp/...'
updatedDate: 2026-08-12
productName: 'SoundPeak Pro 3'   # 記事末尾ボタンの見出し
emoji: '🎧'                       # カード・記事ヘッダーのアイキャッチ
tags: ['ノイズキャンセリング']
featured: true                    # トップの「今月のピックアップ」に固定
draft: true                       # 下書き（ビルド対象から除外）

# --- スペック比較表 ---
comparison:
  caption: 'ノイキャンイヤホン 主要3機種スペック比較'
  products:
    - name: 'SoundPeak Pro 3'
      badge: '総合No.1'          # 任意のラベル
      amazonUrl: 'https://...'   # 表内の購入ボタンに使用
      rakutenUrl: 'https://...'
    - name: 'AirTone X2'
  specs:
    - label: '実売価格'
      values: ['39,800円', '18,900円']  # products と同じ順・同じ数
      best: 1                            # ★ を付ける列（0始まり・任意）
---
```

`amazonUrl` / `rakutenUrl` は未設定ならボタンが描画されません（片方だけでも可）。

### 本文

本文は通常の Markdown です。見出し・表・リストは `@tailwindcss/typography` により自動でスタイルが当たります。スペック比較表は本文ではなく **frontmatter の `comparison`** から生成され、本文の上に表示されます。

## カスタマイズ

| やりたいこと | 編集先 |
| --- | --- |
| サイト名・説明・ナビ | `src/consts.ts` |
| カテゴリーの表示色 | `src/consts.ts` の `CATEGORY_COLORS` |
| 配色・フォント・角丸 | `src/styles/global.css` の `@theme` |
| Amazon / 楽天ボタンの色 | `src/styles/global.css` の `--color-amazon` / `--color-rakuten` |
| 公開URL（canonical / OGP） | `astro.config.mjs` の `site` |
| アフィリエイト表記・免責 | `src/components/Footer.astro` |
| フッターのリンク | `src/consts.ts` の `FOOTER_LINKS` |
| 運営者名・問い合わせ先 | `src/consts.ts` の `SITE_OWNER` / `CONTACT_EMAIL` |
| お問い合わせフォームの送信先 | `src/consts.ts` の `CONTACT_FORM_ENDPOINT`（SSGフォーム等の外部サービス） |

## 公開前のチェックリスト

- [ ] `astro.config.mjs` の `site` を実際の公開URLに変更
- [ ] サンプル記事のアフィリエイトURLを自分のトラッキングID付きURLに差し替え
- [ ] サンプル記事（製品名・スペック値はすべてダミーです）を削除または書き換え
- [ ] ステマ規制対応として、記事上部にもPR表記が必要か確認
- [ ] `src/consts.ts` の `SITE_OWNER` / `CONTACT_EMAIL` を実際の運営者名・連絡先に変更
- [ ] お問い合わせフォームの送信先（`src/consts.ts` の `CONTACT_FORM_ENDPOINT`）が自分の SSGフォーム のURLになっているか確認し、実際に送信テストを実施
- [ ] `/privacy` の記載内容（アクセス解析・広告サービスの利用有無、制定日）を実際の運用に合わせて調整

## 注意

同梱のサンプル記事5本に登場する製品名・価格・スペックはすべて**構成確認用のダミーデータ**です。実在の製品の情報ではないため、公開前に必ず差し替えてください。
