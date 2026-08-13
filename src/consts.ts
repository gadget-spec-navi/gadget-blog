export const SITE_TITLE = 'ガジェットスペック比較ナビ';
export const SITE_DESCRIPTION =
  'イヤホン、スマートフォン、PC、家電。スペックを横並びで比較して、あなたに合う一台を。';

/**
 * ヘッダーのナビゲーション。
 * hideOnMobile: 狭い画面では畳む（ロゴがホームリンクを兼ねるため）
 */
export const NAV_LINKS = [
  { href: '/', label: 'ホーム', hideOnMobile: true },
  { href: '/#articles', label: '比較記事' },
  { href: '/#categories', label: 'カテゴリー' },
];

/**
 * Google アナリティクス（GA4）の測定ID。
 * 空にすると計測タグを出力しない。開発サーバー（astro dev）では常に無効。
 */
export const GA_MEASUREMENT_ID: string = 'G-2GB4QPYTB4';

/**
 * フッターのリンク（プライバシーポリシー・お問い合わせ）。
 */
export const FOOTER_LINKS = [
  { href: '/privacy/', label: 'プライバシーポリシー' },
  { href: '/contact/', label: 'お問い合わせ' },
];

/** 運営者名。公開前に実際の名義へ変更してください。 */
export const SITE_OWNER = 'ガジェットスペック比較ナビ 編集部';

/** お問い合わせ先メールアドレス。公開前に実際のアドレスへ変更してください。 */
export const CONTACT_EMAIL = 'contact@example.com';

/**
 * お問い合わせフォームの送信先URL（form の action）。
 * 静的サイトのため、送信処理は外部サービス（SSGフォーム）に委ねる。
 */
export const CONTACT_FORM_ENDPOINT = 'https://ssgform.com/s/ywSomPl6Sg5b';

/**
 * カテゴリーごとのアクセントカラー。
 * Apple のマーケティングページで使われる「アイブロウ（小見出し）」の配色に倣い、
 * 面ではなく文字色で色分けする。
 */
export const CATEGORY_COLORS: Record<string, string> = {
  イヤホン: '#8944ab',
  スマートフォン: '#0071e3',
  ノートPC: '#00745f',
  スマートウォッチ: '#b64400',
  生活家電: '#bf4080',
};

export const DEFAULT_CATEGORY_COLOR = '#6e6e73';
