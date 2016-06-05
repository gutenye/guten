module.exports = {
  entry: "./src/App",

  output: {
    path: `${__dirname}/dist`,
    filename: "app.js",
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: "babel", exclude: /node_modules/ },
    ]
  },

  devServer: {
    port: 3003,
    host: "0.0.0.0",
    contentBase: "./src",
  },

  devtool: "cheap-module-eval-source-map",
}
