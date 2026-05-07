/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/booking',
        destination: 'https://beautinda.de/artist/FrQzLyDtlESad90G8IAIHBfJGz63',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
