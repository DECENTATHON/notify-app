/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.BACKEND_URL + "/api/:path*",
        permanent: false,
      },
    ];
  },
  images: {
    domains: [''],
  },
    output: 'standalone', 
};

module.exports = nextConfig;
