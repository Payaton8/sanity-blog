'use client';

import { useState } from 'react';
import Link from 'next/link';
import emailjs from 'emailjs-com';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('idle');
  
  // バリデーション
  if (!formData.name || !formData.email || !formData.message) {
    alert('必須項目を入力してください。');
    setIsSubmitting(false);
    return;
  }

  try {
    // デバッグ: 環境変数の確認
    console.log('Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
    console.log('Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
    console.log('Public Key:', process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

    // EmailJSで送信
    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'お問い合わせ',
      message: formData.message,
      sent_at: new Date().toLocaleString('ja-JP')
    };

    console.log('送信パラメータ:', templateParams);

    const result = await emailjs.send(
  'service_cjrm2g8',
  'template_42tqm0s',
  templateParams,
  'ukyvN__bYbvsswiRh'
);

    console.log('送信成功:', result);
    setSubmitStatus('success');
    
    // フォームをリセット
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

  } catch (error) {
    console.error('送信エラー詳細:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ヘッダー */}
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-3xl font-black text-white hover:text-yellow-400 transition-colors">
              HAYABLOG
            </Link>
            <nav className="flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium">ホーム</Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors font-medium">ブログ</Link>
              <Link href="/#about" className="text-gray-300 hover:text-white transition-colors font-medium">プロフィール</Link>
              <Link href="/contact" className="text-yellow-400 font-bold">お問い合わせ</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* パンくずナビ */}
      <div className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
            <span>›</span>
            <span className="text-yellow-400">お問い合わせ</span>
          </nav>
        </div>
      </div>

      {/* ヒーローセクション */}
      <section className="py-20 px-4 text-center border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-wider">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
              CONTACT
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">お気軽にお問い合わせください</p>
          
          <div className="flex justify-center space-x-4">
            <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">WORK</span>
            <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">COLLAB</span>
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">QUESTION</span>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">お問い合わせフォーム</h2>
          
          {/* 成功・エラーメッセージ */}
          {submitStatus === 'success' && (
            <div className="bg-green-900 border border-green-600 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-2xl">✅</span>
                <div>
                  <h3 className="text-green-400 font-bold text-lg mb-2">送信完了！</h3>
                  <p className="text-green-300 mb-2">
                    お問い合わせありがとうございます。
                  </p>
                  <p className="text-green-300 text-sm">
                    📧 24時間以内にご返信いたします
                  </p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-900 border border-red-600 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-2xl">❌</span>
                <div>
                  <h3 className="text-red-400 font-bold text-lg mb-2">送信エラー</h3>
                  <p className="text-red-300 mb-2">
                    申し訳ございません。送信に失敗しました。
                  </p>
                  <p className="text-red-300 text-sm">
                    🔄 しばらく待ってから再度お試しください
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 名前 */}
            <div>
              <label htmlFor="name" className="block text-white font-medium mb-2">
                お名前 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="山田太郎"
              />
            </div>

            {/* メールアドレス */}
            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">
                メールアドレス <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="yamada@example.com"
              />
            </div>

            {/* 件名 */}
            <div>
              <label htmlFor="subject" className="block text-white font-medium mb-2">
                件名
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors"
              >
                <option value="">件名を選択してください</option>
                <option value="お仕事のご依頼">💼 お仕事のご依頼</option>
                <option value="コラボレーション">🤝 コラボレーション</option>
                <option value="技術的な質問">💻 技術的な質問</option>
                <option value="ブログについて">📝 ブログについて</option>
                <option value="その他">💬 その他</option>
              </select>
            </div>

            {/* メッセージ */}
            <div>
              <label htmlFor="message" className="block text-white font-medium mb-2">
                メッセージ <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors resize-vertical"
                placeholder="お問い合わせ内容をご記入ください..."
              />
            </div>

            {/* 送信ボタン */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  送信中...
                </>
              ) : (
                <>
                  <span>📤</span>
                  送信する
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-gray-900 border-t border-gray-700 py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-black text-white mb-4">HAYABLOG</h3>
          <p className="text-gray-400 mb-8">お気軽にお問い合わせください</p>
          
          <Link 
            href="/"
            className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold hover:bg-yellow-300 transition-colors"
          >
            ホームに戻る
          </Link>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-400">
            <p>&copy; 2024 HAYABLOG. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}