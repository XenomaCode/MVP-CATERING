/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Advertencia: esto ignorará todos los errores de ESLint durante el build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
