/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    i18n: {
        locales: ['en-US', 'ru'],
        defaultLocale: 'en-US',
    },
};

module.exports = nextConfig;
