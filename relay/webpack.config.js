module.exports = {
  entry: `${__dirname}/src/app`,

  output: {
    path: `${__dirname}/dist`,
    filename: "app.js"
  },

  module: {
    loaders: [
      {test: /\.js$/, loader: "babel", query: {stage: 0, plugins: [path.join(__dirname, "./scripts/babelRelayPlugin")]}, exclude: /node_modules/}
    ]
  },

  devServer: {
    port: 3003,
    host: "0.0.0.0",
    contentBase: "./src",
  },
}
