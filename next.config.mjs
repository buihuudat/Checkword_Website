/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    NEXT_PUBLIC_ASSEMBLYAI_KEY: process.env.NEXT_PUBLIC_ASSEMBLYAI_KEY,
  },
};

export default nextConfig;
