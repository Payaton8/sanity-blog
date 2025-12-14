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
import Header from '@/components/Header';
import FallingLeaves from '@/components/FallingLeaves';

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  body[] {
  ...,
  _type == "image" => {
    _type,
    asset-> {
      _id,
      url
    },
    alt
  }
},
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
          <h1 className="text-4xl font-serif font-bold mb-4 text-gold">記事が見つかりません</h1>
          <Link href="/blog" className="text-gray-400 hover:text-white underline tracking-widest">
            ブログ一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-washi-texture text-paper-white font-jp selection:bg-blood-red selection:text-white">
      {/* 背景エフェクト */}
      <FallingLeaves />
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-transparent to-samurai-black pointer-events-none z-0" />

      {/* 統一ヘッダー */}
      <Header />

      {/* 記事記事ヘッダー */}
      <header className="relative pt-48 pb-20 px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block border-b border-gold/50 pb-2 mb-8">
            <span className="text-gold tracking-[0.3em] text-sm uppercase">Article</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-10 leading-relaxed tracking-wide drop-shadow-lg">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-400 font-light tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-gold rounded-full"></span>
              <span>
                {post.publishedAt ?
                  new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) :
                  '日付未設定'
                }
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-gold rounded-full"></span>
              <span>{post.author || 'はやと'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* コンテンツエリア */}
      <article className="relative max-w-3xl mx-auto px-6 pb-32 z-10">
        {/* アイキャッチ画像 */}
        {post.mainImage?.asset?.url && (
          <div className="mb-20 rounded-sm overflow-hidden shadow-2xl border border-white/10 group">
            <div className="relative aspect-video">
              <img
                src={post.mainImage.asset.url}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
            </div>
          </div>
        )}

        {/* 記事本文 */}
        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:font-serif prose-headings:tracking-widest prose-headings:text-gold
          prose-h2:text-3xl prose-h2:border-b prose-h2:border-gold/30 prose-h2:pb-4 prose-h2:mt-16 prose-h2:mb-8
          prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
          prose-p:leading-loose prose-p:text-gray-300 prose-p:mb-8 prose-p:font-light prose-p:tracking-wide
          prose-strong:text-white prose-strong:font-bold
          prose-a:text-gold prose-a:underline hover:prose-a:text-white prose-a:transition-colors
          prose-blockquote:border-l-gold prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-gray-400
          prose-li:text-gray-300 prose-li:marker:text-gold
          [&_img]:rounded-sm [&_img]:shadow-lg [&_img]:border [&_img]:border-white/5
        ">
          {post.body ? (
            <PortableText
              value={post.body}
              components={{
                types: {
                  image: ({ value }: any) => (
                    <div className="my-12">
                      <figure>
                        <img
                          src={value.asset.url}
                          alt={value.alt || ''}
                          className="w-full h-auto"
                        />
                        {value.caption && (
                          <figcaption className="text-center text-sm text-gray-500 mt-2 tracking-wider">
                            {value.caption}
                          </figcaption>
                        )}
                      </figure>
                    </div>
                  )
                }
              }}
            />
          ) : (
            <div className="text-center py-20 border border-white/10 bg-black/30 backdrop-blur-sm">
              <p className="text-gray-500 tracking-widest mb-6">本文がありません</p>
              <Link
                href="/blog"
                className="inline-block text-gold hover:text-white border-b border-gold hover:border-white transition-all pb-1 tracking-widest text-sm"
              >
                ブログ一覧に戻る
              </Link>
            </div>
          )}
        </div>

        {/* プロフィール (簡易版) */}
        <div className="mt-24 pt-12 border-t border-gold/30">
          <div className="flex items-center gap-6 bg-black/40 p-8 border border-white/5 backdrop-blur-sm shadow-xl">
            <div className="w-20 h-20 flex-shrink-0 bg-gray-800 rounded-full overflow-hidden border border-gold/50">
              <img src="/profile.jpg" alt="はやと" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-lg font-serif text-white mb-2 tracking-widest">はやと</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                ブログライター。アメリカ留学経験を活かし、AI技術と語学学習の融合を探求中。
              </p>
            </div>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="group inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white hover:border-gold hover:text-gold transition-all duration-500 tracking-[0.2em] text-sm hover:glow-gold bg-black/50 backdrop-blur-sm"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300 mr-2">←</span>
            BACK TO LIST
          </Link>
        </div>
      </article>

      {/* フッター (共通化推奨だが一旦ここに配置) */}
      <footer className="bg-black text-white py-16 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <Link href="/" className="text-3xl font-serif tracking-[0.3em] mb-8 text-white/50 hover:text-gold-gradient transition-colors">HAYABLOG</Link>
          <div className="flex space-x-10 mb-10">
            <a href="#" className="text-gray-500 hover:text-gold transition-colors tracking-widest text-sm">TWITTER</a>
            <a href="#" className="text-gray-500 hover:text-gold transition-colors tracking-widest text-sm">YOUTUBE</a>
            <a href="#" className="text-gray-500 hover:text-gold transition-colors tracking-widest text-sm">GITHUB</a>
          </div>
          <p className="text-gray-700 text-xs tracking-[0.2em]">
            &copy; 2024 HAYATO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}