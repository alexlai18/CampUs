/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
