const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

module.exports = nextConfig;
