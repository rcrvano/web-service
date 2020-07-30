import path from "path";
import htmlWebpackPlugin from "html-webpack-plugin";

const PATH = {
  root: path.resolve(__dirname, "../"),
  web: path.resolve(__dirname, "../web"),
  server: path.resolve(__dirname, "../server"),
  bundle: path.resolve(__dirname, "../bundle"),
  components: path.resolve(__dirname, "../web/components/"),
};

module.exports = {
  mode: "development",
  entry: PATH.web + "/index.tsx",
  output: {
    filename: "[name].bundle.js",
    path: PATH.bundle,
  },
  node: {
    fs: "empty",
  },
  devtool: "cheap-source-map",
  resolve: {
    extensions: ["*", ".ts", ".js", ".tsx", ".sass"],
    alias: {
      "@": PATH.root,
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    overlay: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: PATH.web + "/public/index.html",
    }),
  ],
};
