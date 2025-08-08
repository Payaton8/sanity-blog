import { Metadata } from 'next'

export const siteConfig = {
  name: 'HAYABLOG',
  description: 'AI × 英語学習サイト。アメリカ留学経験を活かした技術ブログとウェブ開発のノウハウを発信。',
  url: 'https://eng-info.com',
  ogImage: 'https://eng-info.com/og-image',
  author: {
    name: 'はやと',
   
    url: 'https://eng-info.com'
  },
  keywords: [
    'AI',
    'AI活用',
    'ChatGPT',
    'Google Gemini',
    'Gemini',
    '英語学習',
    'アメリカ留学',
    'プログラミング',
    'Next.js',
    'ウェブ開発',
    '技術ブログ',
    'エンジニア',
    'React',
    'TypeScript',
    'Sanity',
  
  ]
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: siteConfig.url,
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: description || siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: siteConfig.url,
    },
  }
}