'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = pathname === '/';

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 py-4 shadow-lg border-b border-gold/30' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-2xl md:text-3xl font-serif tracking-[0.2em] text-white hover:text-gold transition-colors duration-500"
                >
                    HAYABLOG
                </Link>
                <nav className="hidden md:flex items-center space-x-12">
                    <Link
                        href="/"
                        className={`tracking-widest text-sm hover:text-gold transition-colors ${pathname === '/' ? 'text-gold font-bold' : 'text-white/80'
                            }`}
                    >
                        ホーム
                    </Link>
                    <Link
                        href="/blog"
                        className={`tracking-widest text-sm hover:text-gold transition-colors ${pathname.startsWith('/blog') ? 'text-gold font-bold' : 'text-white/80'
                            }`}
                    >
                        ブログ
                    </Link>
                    <Link
                        href="/#about"
                        className="text-white/80 tracking-widest text-sm hover:text-gold transition-colors"
                    >
                        プロフィール
                    </Link>
                    <Link
                        href="/contact"
                        className={`border px-6 py-2 text-sm tracking-widest transition-all duration-500 hover:glow-gold ${pathname === '/contact'
                                ? 'bg-gold text-black border-gold hover:bg-white'
                                : 'border-gold text-gold hover:bg-gold hover:text-black'
                            }`}
                    >
                        お問い合わせ
                    </Link>
                </nav>

                {/* Mobile Menu Button (Simple Layout) */}
                <button className="md:hidden text-white hover:text-gold transition-colors">
                    <span className="sr-only">メニュー</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
