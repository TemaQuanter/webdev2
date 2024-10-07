/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ieabroad.com'
      }
    ]
  }
}

export default nextConfig
