var webpack = require("webpack")
var path = require("path")

module.exports = {
  entry: path.join(__dirname, "app/app"),
  output: {path: path.join(__dirname, "dist"), filename: "app.js"},
  module: {
    loaders: [{test: /\.js$/, loader: "babel", query: {stage: 0, plugins: [path.join(__dirname, "./scripts/babelRelayPlugin")]}, exclude: /node_modules/}]
  }
}
