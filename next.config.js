/** @type {import('next').NextConfig} */
const nextConfig = {
  // キャッシュを最小限に
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  // ヘッダー設定でキャッシュ制御
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
