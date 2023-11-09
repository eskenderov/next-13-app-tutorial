/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "cs1.livemaster.ru",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
