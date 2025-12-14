import type { Metadata } from 'next'
import { Cinzel, Noto_Serif_JP } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { generateMetadata } from '@/lib/metadata'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  variable: '--font-noto-serif-jp',
  weight: ['200', '400', '700', '900'],
  display: 'swap',
})

// 新しいメタデータシステムを使用
export const metadata = {
  title: 'AI活用サイト',
  description: 'AI活用サイト。アメリカ留学経験を活かした技術ブログとウェブ開発のノウハウを発信。'

} as Metadata

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
    <html lang="ja" className={`${cinzel.variable} ${notoSerifJP.variable}`}>
      <head>
        <meta name="google-site-verification" content="IrxjyHeprSirq7K6oCVM1IvwU7DoXVPo4JPFqiQzVRc" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="bg-samurai-black text-paper-white">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  )
}