/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Proxy API calls to backend during development
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://brandbase-walf.onrender.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig