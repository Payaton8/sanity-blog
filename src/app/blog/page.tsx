import { blogMetadata } from '../metadata';
import { generateMetadata } from '../../lib/metadata'; // ← 追加

// 強化されたメタデータ
export const metadata = generateMetadata({
  title: '技術ブログ一覧 - AI活用・英語学習・プログラミング',
  description: 'AI技術、英語学習法、プログラミング（Next.js, React, TypeScript）に関する実践的な記事一覧。アメリカ留学経験を活かした学習ノウハウとウェブ開発の最新情報を発信中。',
});

import { client } from '../../../lib/sanity';
import Link from 'next/link';

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
    <div className="min-h-screen bg-white text-gray-900">
      {/* ヘッダー */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <Link href="/" className="text-3xl font-black text-white hover:text-yellow-400 transition-colors">
              HAYABLOG
            </Link>
            <nav className="flex items-center space-x-8">
              <Link href="/" className="text-gray-900 hover:text-gray-600 transition-colors">ホーム</Link>
              <Link href="/blog" className="text-yellow-400 font-bold">ブログ</Link>
            </nav>
          </div>
        </div>
      <Link href="/blog" className="text-gray-600 font-bold hover:text-gray-900"></Link></header>

      {/* ヒーローセクション */}
      <section className="py-20 px-4 text-center border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-wider">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
              BLOG
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">AI活用ノウハウを発信</p>
          
          <div className="flex justify-center space-x-4">
            <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">記事数: {posts.length}</span>
          </div>
        </div>
      </section>

      {/* 記事一覧 */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-4">📝</div>
            <h2 className="text-4xl font-bold text-gray-300 mb-4">記事を準備中...</h2>
            <p className="text-xl text-gray-500 mb-8">Sanity Studioでタイトルを設定してください。</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <article 
                key={post._id}
                className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-yellow-400 transition-all duration-500 hover:scale-105"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 hover:text-yellow-400 transition-colors">
                    <Link href={`/blog/${post.slug?.current || post.slug}`}>
                      {post.title || 'タイトル未設定'}
                    </Link>
                  </h3>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    {post.publishedAt ? 
                      new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 
                      '日付未設定'
                    }
                    {post.author && <span> • by {post.author}</span>}
                  </div>

                  <p className="text-gray-400 mb-4">
                    {post.excerpt || 'この記事の説明文はまだ設定されていません。'}
                  </p>

                  <Link 
                    href={`/blog/${post.slug?.current || post.slug}`}
                    className="inline-flex items-center text-yellow-400 font-medium hover:text-yellow-300 transition-colors"
                  >
                    続きを読む →
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