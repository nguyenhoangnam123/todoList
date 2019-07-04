const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OUT_DIR = path.resolve(__dirname, "dist");

const config = {
  entry: "./src/client/index.tsx",
  output: {
    path: OUT_DIR,
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["awesome-typescript-loader"]
      },
      {
        enforce: "pre",
        test: /\.js?$/,
        use: ["source-map-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".scss", ".css"]
  },

  devServer: {
    contentBase: OUT_DIR,
    port: 3000,
    compress: true,
    proxy: {
      "/api": "http://localhost:8080",
      secure: false
    }
  },

  plugins: [new HtmlWebpackPlugin(), new webpack.NamedModulesPlugin()]
};

module.exports = config;
