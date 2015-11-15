var path = require("path")
var webpack = require("webpack")

module.exports = {
  entry: path.join(__dirname, "app/app.js"),
  output: {path: path.join(__dirname, "dist"), filename: "app.js" },
  module: {
    loaders: [{test: /\.js$/, loader: "babel?presets[]=es2015&presets[]=react", exclude: /node_modules/}]
  }
}
