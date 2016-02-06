var webpack = require("webpack")
var path = require("path")

module.exports = {
  entry: {
    app: "./app/app",
    vendor: "./app/vendor",
  },

  output: {path: path.join(__dirname, "dist"), filename: "app.js"},

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ],

  module: {
    loaders: [
      { test: /\.js$/, loader: "traceur?annotations&memberVariables&modelName&types", exclude: /(node_modules|bower_components)/ }
    ],
    noParse: [ path.join(__dirname, 'node_modules/angular2/bundles') ]
  },

  devServer: {
    port: 3009
  }
}
