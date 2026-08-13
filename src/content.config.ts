import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    // --- 必須 ---
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
    amazonUrl: z.string().url().optional(),
    rakutenUrl: z.string().url().optional(),

    // --- 任意 ---
    updatedDate: z.coerce.date().optional(),
    /** 記事カード / 記事ヘッダーに表示するアイキャッチ絵文字 */
    emoji: z.string().default('📦'),
    /** 記事内で紹介する主要製品名（アフィリエイトボタンの見出しに使用） */
    productName: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),

    /** スペック比較表のデータ */
    comparison: z
      .object({
        caption: z.string().optional(),
        products: z.array(
          z.object({
            name: z.string(),
            badge: z.string().optional(),
            amazonUrl: z.string().url().optional(),
            rakutenUrl: z.string().url().optional(),
          }),
        ),
        specs: z.array(
          z.object({
            label: z.string(),
            /** products と同じ並び順・同じ要素数で記述する */
            values: z.array(z.string()),
            /** 最も優れている列のインデックス（0始まり）。指定するとハイライト表示 */
            best: z.number().int().nonnegative().optional(),
          }),
        ),
      })
      .optional(),
  }),
});

export const collections = { blog };
