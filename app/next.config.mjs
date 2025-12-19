/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'placehold.co',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'picsum.photos',
            port: '',
            pathname: '/**',
        },
        ],
    },
    // Increase the timeout for server actions to accommodate long-running AI tasks like video generation.
    serverActions: {
        bodySizeLimit: '4.5mb', // Default is 1mb, increased for potential large file uploads
        serverActions: true,
        // Set timeout to 120 seconds (2 minutes)
        // This is crucial for long-running operations like video generation with Veo
        // which can take more than the default 45 seconds.
        maxDuration: 120, 
    },
};

export default nextConfig;
