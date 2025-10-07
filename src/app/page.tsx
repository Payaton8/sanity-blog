import { homeMetadata } from './metadata';

export const metadata = homeMetadata;

import Link from 'next/link';

export const revalidate = 60;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヒーローセクション - 動画背景付き */}
      <section className="min-h-screen text-white relative overflow-hidden pt-24">
{/* 統一ヘッダー */}
<header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-gray-800 z-50">
  <div className="max-w-6xl mx-auto px-4 py-6">
    <div className="flex items-center justify-between">
      <Link href="/" className="text-3xl font-black text-white hover:text-yellow-400 transition-colors">
        HAYABLOG
      </Link>
      <nav className="flex items-center space-x-8">
        <Link href="/" className="text-yellow-400 font-bold">ホーム</Link>
        <Link href="/blog" className="text-gray-300 hover:text-white transition-colors font-medium">ブログ</Link>
        <Link href="#about" className="text-gray-300 hover:text-white transition-colors font-medium">プロフィール</Link>
        <Link href="/contact" className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
  お問い合わせ
</Link>
      </nav>
    </div>
  </div>
</header>

        {/* 動画背景 */}
        <div className="absolute inset-0 w-full h-[120vh]">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://cdn.midjourney.com/video/65c64883-c3e6-4983-81e3-664f7ca3331c/2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* メインコンテンツ */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
          <div className="text-center mb-12">
            <div className="text-4xl md:text-6xl lg:text-8xl font-black tracking-wider mb-4">
              <span className="inline-block animate-pulse">HAYABLOG</span>
              
            </div>
            
            
            <div className="text-4xl md:text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              AI活用法サイト
            </div>
          </div>
        </div>
      </section>

      {/* About Meセクション */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* プロフィール画像 */}
            <div className="relative w-64 h-64 mx-auto lg:mx-0 mb-8">
  {/* グラデーションボーダー */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full p-1">
    <div className="w-full h-full rounded-full overflow-hidden">
      <img 
        src="/profile.png.JPG" 
        alt="はやとのプロフィール画像"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>

            {/* プロフィール情報 */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">About Me</h2>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">はやと</h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                ブログライター<br />
                アメリカ（ノースアラバマ大学）で1年間の留学経験あり。<br />
                ChatGPTを活用した英語学習法から、AIに関する情報まで、
実体験に基づく有益な情報を分かりやすくお伝えします。<br />
                <br />

              </p>

              <div className="mt-8">
  <h4 className="text-xl font-bold text-gray-900 mb-4">証明書</h4>
  <div className="space-y-4">
    <div className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
      <img 
        src="/UNA-certification.jpg" 
        alt="主要資格証明書"
        className="w-64 h-48 object-cover rounded-lg"
      />
      <div>
        <p className="font-medium text-gray-800">UNA（University of North Alabama）</p>
        <p className="text-sm text-gray-600">UNA留学証明書</p>
      </div>
    </div>
  </div>
</div>



            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          
          <h3 className="text-6xl md:text-8xl font-black mb-8">Let's Connect</h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/blog"
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-yellow-300 transition-colors"
            >
              ブログを見る
            </Link>
            <button className="bg-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/30 transition-colors">
              お問い合わせ
            </button>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">HAYABLOG</div>
          <p className="text-gray-400">
            &copy; 2024 はやと. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}