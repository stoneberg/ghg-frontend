/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["antd"],
  i18n: {
    locales: ['en', 'ko'],
    defaultLocale: 'ko',
  },
};

module.exports = nextConfig;
