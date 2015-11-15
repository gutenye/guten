var webpack = require("webpack")
var path = require("path")

module.exports = {
  entry: path.join(__dirname, "index"),
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "common.js",
    library: "todocommon",
    libraryTarget: "umd"
  },
  module: {
    loaders: [{test: /\.js$/, loader: "babel?presets[]=es2015", include: __dirname}]
  }
}
