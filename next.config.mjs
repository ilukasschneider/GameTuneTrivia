/** @type {import('next').NextConfig} */
// next.config.mjs

// Define your Next.js configuration object
const nextConfig = {
  images: {
    domains: ["images.igdb.com"],
  },
  // Adding custom Webpack config
  webpack(config, options) {
    // Adding a new rule to handle mp3 files
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/static/sounds/",
          outputPath: "static/sounds/",
          name: "[name].[ext]",
          esModule: false, // This is important for compatibility reasons
        },
      },
    });

    // Always return the modified configuration
    return config;
  },
};

// Export your configuration object with ESM syntax
export default nextConfig;
