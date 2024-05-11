/** @type {import('next').NextConfig} */
// next.config.mjs
import urlLoader from "url-loader";
import fileLoader from "file-loader";

// Define your Next.js configuration object
const nextConfig = {
  images: {
    domains: ["images.igdb.com"],
  },
  webpack(config, { isServer }) {
    // Push a new rule for audio files
    config.module.rules.push({
      test: /\.(mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          // Use the string identifier for the loader instead of importing it
          loader: "url-loader",
          options: {
            limit: false,
            fallback: "file-loader", // Specify the fallback loader as a string
            publicPath: `${config.assetPrefix || ""}/_next/static/images/`,
            outputPath: `${isServer ? "../" : ""}static/images/`,
            name: "[name]-[hash].[ext]",
            esModule: config.esModule || false,
          },
        },
      ],
    });
    config.resolve.extensionAlias = {
      // Your existing alias configurations
      // Adding '.mp3' alongside other formats
      ".mp3": [".mp3"], // Technically, for .mp3 files, this is straightforward, but you might want to consider a broader audio setup
      // Any other extension aliases can go below
    };

    return config;
  },
  // Adding custom Webpack conf
};

// Export your configuration object with ESM syntax
export default nextConfig;
