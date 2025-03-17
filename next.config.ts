import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   eslint: {
      ignoreDuringBuilds: true,
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'robotiza-ai.s3.amazonaws.com',
            pathname: '/**',
         },
         {
            protocol: 'https',
            hostname: 'epirecog.s3.sa-east-1.amazonaws.com',
            pathname: '/**',
         },
      ],
   },
   reactStrictMode: false,
};

export default nextConfig;
