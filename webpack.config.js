const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  context: path.resolve(__dirname, "src"),
  entry: "./js/app.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    port: 9000,
    open: true,
    hot: true,
    compress: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: MiniCssExtractPlugin.loader,
      },
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  },
};
