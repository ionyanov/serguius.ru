/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  cleanDistDir: true,
  output: "export",
  
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig
