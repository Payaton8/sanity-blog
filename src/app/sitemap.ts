import { MetadataRoute } from 'next'
import { client } from '../../lib/sanity' // ← 2つ上の階層

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 記事データを取得
  const posts = await client.fetch(`
    *[_type == "post"]{
      slug,
      publishedAt,
      _updatedAt
    }
  `);

  // 記事のURL一覧を生成
  const postUrls = posts.map((post: any) => ({
    url: `https://eng-info.com/blog/${post.slug.current}`,
    lastModified: new Date(post._updatedAt || post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 静的ページ + 動的記事ページのサイトマップ
  return [
    {
      url: 'https://eng-info.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://eng-info.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://eng-info.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...postUrls, // 全記事を自動追加
  ];
}