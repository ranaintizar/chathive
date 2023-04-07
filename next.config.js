/** @type {import('next').NextConfig} */
const withVideos = require("next-videos");
const dotenv = require("dotenv");

dotenv.config();

module.exports = withVideos({
  env: {
    APIKEY: process.env.APIKEY,
    FIREBASEAPIKEY: process.env.FIREBASEAPIKEY,
    AUTHDOMAIN: process.env.AUTHDOMAIN,
    DATABASEURL: process.env.DATABASEURL,
    PROJECTID: process.env.PROJECTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
    APPID: process.env.APPID,
    MEASUREMENTID: process.env.MEASUREMENTID,
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
