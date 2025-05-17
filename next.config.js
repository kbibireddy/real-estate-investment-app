/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    })
    return config
  },
  // Suppress specific React warnings
  reactStrictMode: false,
  output: 'export',
  basePath: '/real-estate-investment-app',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 