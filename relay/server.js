import express from "express"
import path from "path"
import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"

var compiler = webpack({
  entry: path.resolve(__dirname, "src", "app.js"),
  module: {
    loaders: [
      { exclude: /node_modules/, loader: "babel", query: {stage: 0, plugins: ["./scripts/babelRelayPlugin"]}, test: /\.js$/, }
    ]
  },
  output: {filename: "app.js", path: "/"},
  resolve: {
    root: [`${__dirname}/src`],
  },
  devtool: "cheap-module-eval-source-map",
})

var app = new WebpackDevServer(compiler, {
  proxy: {"/graphql": `http://localhost:3003`},
})

app.use("/", express.static(path.resolve(__dirname)))

app.listen(3001, () => {
  console.log(`App is now running on http://localhost:3001`)
})
