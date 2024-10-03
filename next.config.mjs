/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["http://source.unsplash.com/{id}", "cdn.pixabay.com", "images.pexel.com"],
      },
      experimental: {
        serverActions: true
      }
};

export default nextConfig;
