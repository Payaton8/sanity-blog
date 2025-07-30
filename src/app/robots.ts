import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://hayablog.vercel.app'; // 後で実際のURLに変更

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '*.json',
          '/og-image', // OGP画像生成エンドポイントは直接アクセス不要
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}