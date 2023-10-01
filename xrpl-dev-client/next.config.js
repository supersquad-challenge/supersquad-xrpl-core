/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_XUMM_API_KEY: process.env.XUMM_API_KEY,
    NEXT_PUBLIC_XUMM_API_SECRET: process.env.XUMM_API_SECRET,
    NEXT_PUBLIC_RPC_URL: process.env.XRPL_RPC_URL
  }
}

module.exports = nextConfig
