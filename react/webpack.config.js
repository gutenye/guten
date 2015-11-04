var path = require("path")
var webpack = require("webpack")

module.exports = {
  devtool: "eval",
  entry: [
    "webpack-dev-server/client?",
    "webpack/hot/only-dev-server",
    "./app/app.js"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/assets/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ["react-hot", "babel"],
      include: path.join(__dirname, "app")
    }]
  }
}
