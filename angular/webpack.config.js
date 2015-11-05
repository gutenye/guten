var webpack = require("webpack")
var path = require("path")

module.exports = {
  entry: path.join(__dirname, "app/app"),
  output: {path: path.join(__dirname, "dist"), filename: "app.js"},
  module: {
    loaders: [{test: /\.js$/, loader: "traceur?annotations&memberVariables&modelName&types", include: path.join(__dirname, "app")}]
  }
}
