import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES, type Category } from '../consts';

export type Post = CollectionEntry<'blog'>;

/** 下書きを除いた公開記事を、新しい順に返す */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 指定カテゴリーの公開記事を、新しい順に返す */
export async function getPostsByCategory(label: string): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.data.category === label);
}

export type CategorySummary = Category & {
  posts: Post[];
  count: number;
  href: string;
};

/**
 * カテゴリー定義に記事を紐づけて返す。
 * 記事が 0 件のカテゴリーは、空のページを作らないよう除外する。
 * 並び順は記事数の多い順（同数なら CATEGORIES の定義順）。
 */
export async function getCategorySummaries(): Promise<CategorySummary[]> {
  const posts = await getPublishedPosts();

  return CATEGORIES.map((category) => {
    const categoryPosts = posts.filter((post) => post.data.category === category.label);
    return {
      ...category,
      posts: categoryPosts,
      count: categoryPosts.length,
      href: `/category/${category.slug}/`,
    };
  })
    .filter((category) => category.count > 0)
    .sort((a, b) => b.count - a.count);
}
