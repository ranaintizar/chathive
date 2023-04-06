/** @type {import('next').NextConfig} */
const withVideos = require("next-videos");
const dotenv = require("dotenv");

dotenv.config();

module.exports = withVideos({
  env: {
    APIKEY: process.env.APIKEY,
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
});
