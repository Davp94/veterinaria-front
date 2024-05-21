/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        port: process.env.PORT
    },
    distDir: 'dist'
};

export default nextConfig;
