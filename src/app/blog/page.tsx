import { blogMetadata } from '../metadata';
import { generateMetadata } from '../../lib/metadata';

// 強化されたメタデータ
export const metadata = generateMetadata({
  title: '技術ブログ一覧 - AI活用・英語学習・プログラミング',
  description: 'AI技術、英語学習法、プログラミング（Next.js, React, TypeScript）に関する実践的な記事一覧。アメリカ留学経験を活かした学習ノウハウとウェブ開発の最新情報を発信中。',
});

import { client } from '../../../lib/sanity';
import Link from 'next/link';
import FallingLeaves from '@/components/FallingLeaves';
import Header from '@/components/Header';

export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function getPosts() {
  try {
    const posts = await client.fetch(
      `*[_type == "post"] | order(publishedAt desc)`,
      {},
      {
        cache: 'no-store',
        next: { revalidate: 0 }
      }
    );
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-washi-texture text-paper-white font-jp selection:bg-blood-red selection:text-white">
      {/* 背景エフェクト */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FallingLeaves />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-samurai-black" />
      </div>

      {/* 統一ヘッダー */}
      <Header />

      {/* ヒーローセクション */}
      <section className="relative pt-48 pb-20 px-4 text-center z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif text-gold-gradient tracking-widest mb-6 opacity-90 animate-fade-in-up drop-shadow-lg">
            ブログ
          </h1>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-8"></div>
          <p className="text-lg text-gray-400 mb-8 tracking-[0.4em] font-light">
            AI活用ノウハウ / 開発記録
          </p>

          <div className="flex justify-center space-x-4">
            <span className="border border-white/20 text-gray-400 px-6 py-2 text-xs tracking-widest uppercase bg-black/40 backdrop-blur-sm">
              Total Posts: {posts.length}
            </span>
          </div>
        </div>
      </section>

      {/* 記事一覧 */}
      <div className="relative max-w-7xl mx-auto px-6 pb-32 z-10">
        {posts.length === 0 ? (
          <div className="text-center py-20 border border-white/10 p-12 bg-black/50 backdrop-blur-md">
            <div className="text-6xl mb-6 opacity-50">🍵</div>
            <h2 className="text-2xl font-serif text-white mb-4 tracking-widest">記事準備中</h2>
            <p className="text-gray-500 tracking-wide">ただいま執筆中でございます。</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post: any) => (
              <article
                key={post._id}
                className="group relative bg-black/60 border border-white/10 overflow-hidden transition-all duration-700 hover:border-gold/50 hover:bg-black/80 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* 装飾 */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 text-gold-gradient"></div>

                <div className="p-10">
                  <div className="text-xs text-gold/80 mb-6 tracking-widest uppercase flex items-center gap-2 font-serif">
                    <span>
                      {post.publishedAt ?
                        new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        }) :
                        'Unknown Date'
                      }
                    </span>
                    <span className="w-1 h-1 bg-gold/50 rounded-full"></span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-6 leading-relaxed group-hover:text-gold-gradient transition-all duration-300 line-clamp-2 min-h-[4.5rem] tracking-wide font-serif">
                    <Link href={`/blog/${post.slug?.current || ''}`}>
                      {post.title || '無題'}
                    </Link>
                  </h3>

                  <p className="text-gray-400 mb-10 text-sm leading-8 line-clamp-3 font-light tracking-wider">
                    {post.excerpt || '本文をご確認ください...'}
                  </p>

                  <Link
                    href={`/blog/${post.slug?.current || post.slug}`}
                    className="inline-flex items-center text-white/60 text-xs tracking-[0.3em] group-hover:text-gold transition-colors uppercase border-b border-transparent group-hover:border-gold pb-1"
                  >
                    <span>Read More</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}