import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://eng-info.com'; // ← ドメイン修正

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio',    // ← 追加（Sanity管理画面）
          '/api/',
          '/_next/',
          '/admin/',
      ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}