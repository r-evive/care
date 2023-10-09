/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/:path*',
            destination: `${process.env.NEXT_PUBLIC_URL}/:path*`,
            permanent: true,
          },
        ];
      },
}

module.exports = nextConfig
