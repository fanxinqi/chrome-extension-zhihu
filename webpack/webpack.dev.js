const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

console.log(path.posix.resolve(__dirname, "../server"))
module.exports = merge(common, {
  devtool: "inline-source-map",
  mode: "development",
  watchOptions: {
    ignored: ["**/node_modules", path.posix.resolve(__dirname, "../server")],
  },
});