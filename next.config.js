/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: `/api/:path*`,
            destination: `/api/:path*`,
          },
          {
            source: `/:path*`,
            destination: `${process.env.NEXT_PUBLIC_URL}/:path*`,
          },
        ];
      },
}

module.exports = nextConfig
