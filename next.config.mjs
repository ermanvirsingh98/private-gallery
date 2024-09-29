/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["http://source.unsplash.com/{id}", "cdn.pixabay.com", "images.pexel.com"],
      },
};

export default nextConfig;
