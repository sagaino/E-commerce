/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/product',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
