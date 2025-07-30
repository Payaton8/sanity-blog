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
}

export default nextConfig