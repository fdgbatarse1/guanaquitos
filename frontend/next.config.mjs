/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    BACKEND_GRAPHQL_URL: process.env.BACKEND_GRAPHQL_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'guanaquitos-aws-s3-bucket.s3.us-east-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
