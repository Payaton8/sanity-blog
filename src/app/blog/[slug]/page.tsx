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
  "author": author->name,
  mainImage {
    asset-> {
      _id,
      url
    }
  }
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
    <div className="min-h-screen bg-white text-gray-900">
      {/* ヘッダー */}
      <header className="border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-gray-900 hover:text-gray-600 transition-colors">
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
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* アイキャッチ画像 */}
{post.mainImage?.asset?.url && (
  <div className="mb-8">
    <img 
      src={post.mainImage.asset.url}
      alt={post.title}
      className="w-full h-auto rounded-lg object-cover"
    />
  </div>
)}

        {/* メタ情報 */}
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
              <img 
  src="/profile.png.JPG" 
  alt="はやとのプロフィール画像"
  className="w-full h-full object-cover"
/>
            </div>
            <div>
              <div className="text-gray-900 font-medium">{post.author || 'はやと'}</div>
              <div className="text-gray-500 text-sm">Author</div>
            </div>
          </div>
          
          <div className="text-gray-400">
            <div className="text-gray-600 font-medium">
              {post.publishedAt ? 
                new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 
                '日付未設定'
              }
            </div>
            <div className="text-gray-600">公開日</div>
          </div>
        </div>

        {/* 記事本文 */}
        <div className="text-gray-800 leading-relaxed space-y-6 
  [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:pb-3 [&_h2]:border-b [&_h2]:border-gray-200 [&_h2]:text-gray-900
  [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:text-gray-900
  [&_h4]:text-xl [&_h4]:font-bold [&_h4]:mt-6 [&_h4]:mb-3 [&_h4]:text-gray-900
  [&_p]:text-gray-800 [&_p]:leading-relaxed [&_p]:mb-6
  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-6
  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-6
  [&_li]:text-gray-800 [&_li]:my-2
  [&_strong]:text-gray-900 [&_strong]:font-bold
  [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:underline">
          {post.body ? (
            <div className="text-gray-800 leading-relaxed space-y-6">
              <PortableText 
  value={post.body}
  components={{
    types: {
      image: ({value}: any) => (
        <div className="my-8">
          <img 
            src={value.asset.url} 
            alt={value.alt || ''} 
            className="w-full h-auto rounded-lg"
          />
        </div>
      )
    }
  }}
/>
            </div>
          ) : (
            <div className="bg-gray-100 border border-gray-200 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">記事本文を準備中....</h3>
              <p className="text-gray-600 mb-6">
                Sanity Studioで記事本文を作成してください。
              </p>
              <Link 
                href="http://localhost:3333"
                target="_blank"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-500 transition-colors"
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
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-500 transition-colors"
          >
            ブログ一覧に戻る
          </Link>
        </div>
      </article>
    </div>
  );
}