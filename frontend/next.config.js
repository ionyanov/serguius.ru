/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  cleanDistDir: true,
  output: "export",

  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    loader: 'custom',
    loaderFile: './src/provider/Loader/loader.ts',
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
    ],
  },
};

module.exports = nextConfig
