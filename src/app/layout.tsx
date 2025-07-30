import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HAYABLOG - AI × 英語学習サイト',
  description: 'AI × 英語学習サイト。アメリカ留学経験を活かした技術ブログとウェブ開発のノウハウを発信。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 構造化データ
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HAYABLOG",
    "description": "AI・英語学習サイト。アメリカ留学経験を活かし英語学習ノウハウを発信。",
    "url": "https://hayablog.vercel.app",
    "author": {
      "@type": "Person",
      "name": "はやと",
      "description": "ブログライター。アメリカ留学経験を活かし英語学習ノウハウを発信。"
    },
    "publisher": {
      "@type": "Organization",
      "name": "HAYABLOG",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hayablog.vercel.app/og-image"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://hayablog.vercel.app/blog?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}