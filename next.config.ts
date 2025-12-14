import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // ビルド時のESLintエラーを無視
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ビルド時のTypeScriptエラーを無視
    ignoreBuildErrors: true,
  },
  images: {
    // 画像最適化を無効化（デプロイエラー回避）
    unoptimized: true,
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  async headers() {
    return [
      {
        source: '/blog',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
}

export default nextConfig