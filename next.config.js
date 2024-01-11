/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'images.ingressosfast.com.br'
            }
        ]
    }
}

module.exports = nextConfig
