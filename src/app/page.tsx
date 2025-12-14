import { homeMetadata } from './metadata';

export const metadata = homeMetadata;

import Link from 'next/link';
import FallingLeaves from '@/components/FallingLeaves';
import Header from '@/components/Header';

export const revalidate = 60;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-washi-texture text-paper-white font-jp selection:bg-blood-red selection:text-white">
      {/* ヒーローセクション */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* 背景エフェクト */}
        <FallingLeaves />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-samurai-black z-10 pointer-events-none" />

        {/* 統一ヘッダー */}
        <Header />

        {/* ヒーローコンテンツ */}
        <div className="relative z-20 text-center px-4 mt-[-10vh]">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-gold-gradient tracking-widest mb-4 opacity-90 drop-shadow-sm">
              HAYABLOG
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-10"></div>
            <p className="text-xl md:text-3xl font-light tracking-[0.4em] text-gray-300">
              AI活用法サイト
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16 animate-fade-in-up delay-300">
            <Link
              href="/blog"
              className="group relative px-10 py-4 overflow-hidden bg-transparent border border-white/30 text-white transition-all duration-500 hover:border-gold hover:text-gold hover:glow-gold"
            >
              <span className="relative z-10 tracking-[0.3em] text-sm">ブログを読む</span>
              <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Meセクション */}
      <section id="about" className="relative py-40 px-6 border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* プロフィール画像 */}
            <div className="relative mx-auto lg:mx-0 group">
              <div className="relative z-10 w-72 h-96 transition-all duration-700 ease-out overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/profile.jpg"
                  alt="はやとのプロフィール画像"
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/20"></div>
              </div>
              {/* 装飾的な枠線 */}
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-gold/40 z-0 transition-all duration-500 group-hover:-top-8 group-hover:-left-8"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b border-r border-gold/40 z-0 transition-all duration-500 group-hover:-bottom-8 group-hover:-right-8"></div>
            </div>

            {/* プロフィール情報 */}
            <div>
              <h2 className="text-gold-gradient tracking-[0.3em] text-sm mb-6 uppercase font-serif">About Me</h2>
              <h3 className="text-4xl md:text-6xl font-serif text-white mb-10 tracking-wide">はやと</h3>

              <div className="space-y-8 text-gray-400 leading-loose tracking-wide font-light text-lg">
                <p>
                  ブログライター。<br />
                  アメリカ・ノースアラバマ大学での留学経験を経て、<br />
                  現在はAI技術と語学学習の融合を探求しています。
                </p>
                <p>
                  ChatGPTをはじめとする最新AIツールの活用法、<br />
                  そして実体験に基づいた英語学習ノウハウを、<br />
                  静謐かつ明快にお伝えします。
                </p>
              </div>

              <div className="mt-16">
                <h4 className="text-white text-xl mb-8 tracking-widest border-l-2 border-gold pl-6">Certificate</h4>
                <div className="flex items-start space-x-8 group">
                  <div className="w-40 h-28 overflow-hidden border border-white/10 relative shadow-lg">
                    <img
                      src="/UNA-certification.jpg"
                      alt="UNA Certification"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="pt-2">
                    <p className="text-white font-serif tracking-wide text-xl">University of North Alabama</p>
                    <p className="text-gold/80 text-sm mt-2 tracking-wider">留 学 証 明 書</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="relative py-40 px-4 bg-gradient-to-b from-samurai-black to-black text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">

          <h3 className="text-6xl md:text-8xl font-serif mb-16 tracking-widest text-gold-gradient opacity-90">
            精 進
          </h3>
          <p className="text-gray-400 mb-16 tracking-[0.3em] text-lg font-light">
            共に学び、共に成長する。
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link
              href="/blog"
              className="bg-gold text-black px-12 py-5 font-bold hover:bg-white transition-colors duration-500 tracking-[0.2em] shadow-[0_0_20px_rgba(204,170,108,0.4)] hover:shadow-[0_0_30px_rgba(204,170,108,0.6)]"
            >
              ブログ一覧
            </Link>
            <Link
              href="/contact"
              className="border border-white/20 text-white px-12 py-5 hover:border-gold hover:text-gold transition-colors duration-500 tracking-[0.2em] hover:glow-gold"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-black text-white py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="text-3xl font-serif tracking-[0.3em] mb-8 text-white/50 hover:text-gold-gradient transition-colors cursor-default">HAYABLOG</div>
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