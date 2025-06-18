import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   eslint: {
      ignoreDuringBuilds: true,
   },
   sassOptions: {
      silenceDeprecations: [
         'legacy-js-api',
         'mixed-decls',
         'color-functions',
         'global-builtin',
         'import'
      ],
      quietDeps: true,
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
