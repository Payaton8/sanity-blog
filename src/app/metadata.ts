import type { Metadata } from 'next';
// 基本的なサイト情報
export const siteConfig = {
name: 'HAYABLOG',
description: 'AI活用法サイト。アメリカ留学経験を活かした英語学習ノウハウを発信。',
url: 'https://hayablog.vercel.app', // 後で実際のURLに変更
ogImage: '/og-image.jpg',
creator: 'はやと',
keywords: [

'プログラミング',
'英語学習',
'AI',
'アメリカ留学',
'フロントエンド',
'ブログ',
'HAYABLOG'
]
};
// トップページのメタデータ
export const homeMetadata: Metadata = {
title: 'HAYABLOG - AI活用法サイト',
description: siteConfig.description,
keywords: siteConfig.keywords,
authors: [{ name: siteConfig.creator }],
creator: siteConfig.creator,
openGraph: {
type: 'website',
locale: 'ja_JP',
url: siteConfig.url,
title: siteConfig.name,
description: siteConfig.description,
siteName: siteConfig.name,
images: [
{
url: siteConfig.ogImage,
width: 1200,
height: 630,
alt: 'HAYABLOG - AI活用法サイト',
},
],
},
twitter: {
card: 'summary_large_image',
title: siteConfig.name,
description: siteConfig.description,
images: [siteConfig.ogImage],
},
robots: {
index: true,
follow: true,
googleBot: {
index: true,
follow: true,
'max-video-preview': -1,
'max-image-preview': 'large',
'max-snippet': -1,
},
},
verification: {
google: 'google-site-verification-code', // Google Search Console で取得
},
};
// ブログページのメタデータ
export const blogMetadata: Metadata = {
  title: 'ブログ一覧 | HAYABLOG - 技術ブログ',
  description: '最新の技術トレンドと開発ノウハウを発信。Next.js、React、TypeScript、AI、英語学習について解説します。',
  keywords: [...siteConfig.keywords, 'ブログ一覧', '記事', '最新情報'],
  openGraph: {
    title: 'ブログ一覧 | HAYABLOG',
    description: '最新の技術トレンドと開発ノウハウを発信',
    url: `${siteConfig.url}/blog`,  
    images: [siteConfig.ogImage],
  },
};
// お問い合わせページのメタデータ
export const contactMetadata: Metadata = {
title: 'お問い合わせ | HAYABLOG ',
description: 'お気軽にお問い合わせください。',
keywords: [...siteConfig.keywords, 'お問い合わせ'],
openGraph: {
title: 'お問い合わせ | HAYABLOG',
description: 'お気軽にお問い合わせください',
url: `${siteConfig.url}/contact`,
images: [siteConfig.ogImage],
},
};
// 記事ページのメタデータ生成関数
export function generateArticleMetadata(
title: string,
description: string,
slug: string,
publishedAt?: string,
image?: string
): Metadata {
return {
title: `${title} | HAYABLOG`,  // ← バッククォート（`）で囲む
description: description,
keywords: siteConfig.keywords,
authors: [{ name: siteConfig.creator }],
openGraph: {
type: 'article',
locale: 'ja_JP',
url:` ${siteConfig.url}/blog/${slug}`,
title: title,
description: description,
siteName: siteConfig.name,
images: [
{
url: image || siteConfig.ogImage,
width: 1200,
height: 630,
alt: title,
},
],
publishedTime: publishedAt,
},
twitter: {
card: 'summary_large_image',
title: title,
description: description,
images: [image || siteConfig.ogImage],
},
};
}