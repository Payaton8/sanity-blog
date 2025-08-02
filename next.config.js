/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint を本番ビルド時に無効化
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript エラーも無視（必要に応じて）
  typescript: {
    ignoreBuildErrors: true,
  },
  // 既存の設定
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
};

module.exports = nextConfig;
