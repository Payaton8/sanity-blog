import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { generateMetadata } from '@/lib/metadata' // ← 追加

const inter = Inter({ subsets: ['latin'] })

// 新しいメタデータシステムを使用
export const metadata = generateMetadata({
  title: 'AI活用サイト',
  description: 'AI活用サイト。アメリカ留学経験を活かした技術ブログとウェブ開発のノウハウを発信。'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 構造化データ（URLを正しいドメインに更新）
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HAYABLOG",
    "description": "AI活用サイト。",
    "url": "https://eng-info.com", // ← ドメイン更新
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
        "url": "https://eng-info.com/og-image" // ← ドメイン更新
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://eng-info.com/blog?search={search_term_string}", // ← ドメイン更新
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
      <body className={inter.className}>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  )
}