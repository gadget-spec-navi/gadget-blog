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
  { href: '/category/', label: 'カテゴリー' },
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
 * カテゴリーの定義。ここが唯一の情報源で、
 * 記事の frontmatter の `category` に書ける値（label）と
 * カテゴリーページの URL（/category/{slug}/）を同時に決める。
 *
 * 新しいカテゴリーを追加するときは、ここに 1 行足すだけでよい
 * （カテゴリーページ・一覧・ナビは自動で追随する）。
 *
 * - slug: URL に使う英数字。日本語をそのまま URL に出さないための対応表
 * - label: 記事の frontmatter に書く表示名
 * - color: アイブロウ（小見出し）の文字色。面ではなく文字で色分けする
 * - description: カテゴリーページの導入文
 */
export const CATEGORIES = [
  {
    slug: 'earphones',
    label: 'イヤホン',
    emoji: '🎧',
    color: '#8944ab',
    description: 'ノイズキャンセリング性能、コーデック、バッテリー。数字で選ぶ完全ワイヤレス。',
  },
  {
    slug: 'smartphone',
    label: 'スマートフォン',
    emoji: '📱',
    color: '#0071e3',
    description: 'カメラのセンサーサイズ、SoC、電池容量。価格帯ごとの実力差を横並びで。',
  },
  {
    slug: 'notebook-pc',
    label: 'ノートPC',
    emoji: '💻',
    color: '#00745f',
    description: 'CPU・GPU性能から実測重量、端子構成まで。持ち運ぶ一台を仕様から選ぶ。',
  },
  {
    slug: 'smartwatch',
    label: 'スマートウォッチ',
    emoji: '⌚',
    color: '#b64400',
    description: 'GPS常時オンでの駆動時間、センサー、決済対応。毎日つける前提で比較。',
  },
  {
    slug: 'home-appliance',
    label: '生活家電',
    emoji: '🤖',
    color: '#bf4080',
    description: '吸引力、静音性、メンテナンス頻度。カタログ値と使い勝手の両面から。',
  },
  {
    slug: 'desk-gear',
    label: 'デスク周辺機器',
    emoji: '🖱️',
    color: '#5c5ce0',
    description: 'マウス・ハブ・照明など、作業机まわりの一台。価格と使い勝手のバランスで選ぶ。',
  },
] as const;

export type Category = (typeof CATEGORIES)[number];

/** frontmatter の `category` に書ける値（content.config.ts のバリデーションに使用） */
export const CATEGORY_LABELS = CATEGORIES.map((category) => category.label) as [
  string,
  ...string[],
];

/** 表示名からカテゴリー定義を引く。未登録の表示名なら undefined */
export function findCategory(label: string): Category | undefined {
  return CATEGORIES.find((category) => category.label === label);
}

/** 表示名からカテゴリーページの URL を組む。未登録なら一覧ページへ逃がす */
export function categoryPath(label: string): string {
  const category = findCategory(label);
  return category ? `/category/${category.slug}/` : '/category/';
}

/**
 * カテゴリーごとのアクセントカラー。
 * Apple のマーケティングページで使われる「アイブロウ（小見出し）」の配色に倣い、
 * 面ではなく文字色で色分けする。
 */
export const CATEGORY_COLORS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((category) => [category.label, category.color]),
);

export const DEFAULT_CATEGORY_COLOR = '#6e6e73';
