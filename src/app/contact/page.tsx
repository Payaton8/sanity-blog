'use client';

import { useState } from 'react';
import Link from 'next/link';
import emailjs from 'emailjs-com';
import Header from '@/components/Header';
import FallingLeaves from '@/components/FallingLeaves';

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
      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'お問い合わせ',
        message: formData.message,
        sent_at: new Date().toLocaleString('ja-JP')
      };

      await emailjs.send(
        'service_cjrm2g8',
        'template_42tqm0s',
        templateParams,
        'ukyvN__bYbvsswiRh'
      );

      setSubmitStatus('success');
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
    <div className="min-h-screen bg-washi-texture text-paper-white font-jp selection:bg-blood-red selection:text-white">
      {/* 背景エフェクト */}
      <FallingLeaves />
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-transparent to-samurai-black pointer-events-none z-0" />

      {/* 統一ヘッダー */}
      <Header />

      {/* ヒーローセクション */}
      <div className="relative pt-48 pb-20 px-4 text-center z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif text-gold-gradient tracking-widest mb-8 opacity-90 animate-fade-in-up">
            CONTACT
          </h1>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-10"></div>
          <p className="text-lg text-gray-400 mb-10 tracking-[0.4em] font-light">
            お問い合わせ
          </p>

          <div className="flex justify-center flex-wrap gap-4">
            <span className="border border-gold/40 text-gold/80 px-6 py-2 text-xs tracking-widest uppercase bg-black/40 backdrop-blur-sm">WORK</span>
            <span className="border border-white/20 text-gray-400 px-6 py-2 text-xs tracking-widest uppercase bg-black/40 backdrop-blur-sm">COLLAB</span>
            <span className="border border-white/20 text-gray-400 px-6 py-2 text-xs tracking-widest uppercase bg-black/40 backdrop-blur-sm">QUESTION</span>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="relative max-w-3xl mx-auto px-6 pb-32 z-10">
        <div className="bg-black/60 border border-white/10 p-8 md:p-12 backdrop-blur-md shadow-2xl">

          {/* 成功・エラーメッセージ */}
          {submitStatus === 'success' && (
            <div className="bg-green-900/30 border border-green-600/50 rounded p-6 mb-8 text-center animate-fade-in">
              <h3 className="text-green-400 font-serif tracking-widest text-lg mb-2">送信完了</h3>
              <p className="text-gray-300 text-sm tracking-wide">お問い合わせありがとうございます。<br />内容を確認次第、ご連絡いたします。</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-900/30 border border-red-600/50 rounded p-6 mb-8 text-center animate-fade-in">
              <h3 className="text-red-400 font-serif tracking-widest text-lg mb-2">送信エラー</h3>
              <p className="text-gray-300 text-sm tracking-wide">申し訳ございません。送信に失敗しました。<br />時間をおいて再度お試しください。</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 名前 */}
            <div>
              <label htmlFor="name" className="block text-gold/80 text-xs tracking-widest uppercase mb-3">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-300 tracking-wide"
                placeholder="お名前を入力してください"
              />
            </div>

            {/* メールアドレス */}
            <div>
              <label htmlFor="email" className="block text-gold/80 text-xs tracking-widest uppercase mb-3">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-300 tracking-wide"
                placeholder="example@email.com"
              />
            </div>

            {/* 件名 */}
            <div>
              <label htmlFor="subject" className="block text-gold/80 text-xs tracking-widest uppercase mb-3">
                Subject
              </label>
              <div className="relative">
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-black/40 border border-white/10 text-white focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-300 tracking-wide appearance-none cursor-pointer"
                >
                  <option value="" className="text-gray-500">件名を選択してください</option>
                  <option value="お仕事のご依頼" className="text-black">お仕事のご依頼</option>
                  <option value="コラボレーション" className="text-black">コラボレーション</option>
                  <option value="技術的な質問" className="text-black">技術的な質問</option>
                  <option value="その他" className="text-black">その他</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold/50">
                  ▼
                </div>
              </div>
            </div>

            {/* メッセージ */}
            <div>
              <label htmlFor="message" className="block text-gold/80 text-xs tracking-widest uppercase mb-3">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-4 py-4 bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-300 tracking-wide resize-y leading-relaxed"
                placeholder="お問い合わせ内容をご記入ください..."
              />
            </div>

            {/* 送信ボタン */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center justify-center px-12 py-4 bg-transparent border border-gold/50 text-gold font-serif tracking-[0.2em] hover:bg-gold hover:text-black transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(204,170,108,0.4)]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SENDING...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center gap-2">
                    SEND MESSAGE
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

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