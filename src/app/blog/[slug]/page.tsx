import { generateArticleMetadata } from '../../metadata';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: '記事が見つかりません | HAYABLOG',
    };
  }

  return generateArticleMetadata(
    post.title,
    post.excerpt || post.title,
    slug,
    post.publishedAt,
    post.mainImage?.asset?.url
  );
}

import { client } from '../../../../lib/sanity';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    "author": author->name
  }`;
  
  const post = await client.fetch(query, { slug });
  return post;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-400">記事が見つかりません</h1>
          <Link href="/blog" className="text-yellow-400 hover:text-yellow-300 underline">
            ブログ一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ヘッダー */}
      <header className="border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-3xl font-black text-white hover:text-yellow-400 transition-colors">
              HAYABLOG
            </Link>
            <nav className="flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">ホーム</Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">ブログ</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 記事コンテンツ */}
      <article className="max-w-2xl mx-auto px-6 py-12">
        {/* タイトル */}
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* メタ情報 */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
              <img 
  src="/profile.png.JPG" 
  alt="はやとのプロフィール画像"
  className="w-full h-full object-cover"
/>
            </div>
            <div>
              <div className="text-white font-medium">{post.author || 'はやと'}</div>
              <div className="text-gray-400 text-sm">Author</div>
            </div>
          </div>
          
          <div className="text-gray-400">
            <div className="text-white font-medium">
              {post.publishedAt ? 
                new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 
                '日付未設定'
              }
            </div>
            <div className="text-sm">公開日</div>
          </div>
        </div>

        {/* 記事本文 */}
        <div className="prose prose-invert prose-lg max-w-none">
          {post.body ? (
            <div className="text-gray-300 leading-relaxed space-y-6">
              <PortableText value={post.body} />
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-300 mb-4">記事本文を準備中...</h3>
              <p className="text-gray-500 mb-6">
                Sanity Studioで記事本文を作成してください。
              </p>
              <Link 
                href="http://localhost:3333"
                target="_blank"
                className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
              >
                Sanity Studioを開く
              </Link>
            </div>
          )}
        </div>

        {/* 戻るボタン */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <Link 
            href="/blog"
            className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold hover:bg-yellow-300 transition-colors"
          >
            ブログ一覧に戻る
          </Link>
        </div>
      </article>
    </div>
  );
}