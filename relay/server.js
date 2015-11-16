import express from "express"
import graphQLHTTP from "express-graphql"
import path from "path"
import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import {Schema} from "./app/common/schema"
import _ from "lodash-guten"
global._ = _

const APP_PORT = 3001
const GRAPHQL_PORT = 3009

// Expose a GraphQL endpoint
var graphQLServer = express()
graphQLServer.use("/", graphQLHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema,
}))
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
))

// Serve the Relay app
var compiler = webpack({
  entry: path.resolve(__dirname, "app", "app.js"),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel",
        query: {stage: 0, plugins: ["./scripts/babelRelayPlugin"]},
        test: /\.js$/,
      }
    ]
  },
  output: {filename: "app.js", path: "/"}
})
var app = new WebpackDevServer(compiler, {
  //contentBase: "/public/",
  proxy: {"/graphql": `http://localhost:${GRAPHQL_PORT}`},
  //publicPath: "/app/",
  //stats: {colors: true}
})
// Serve static resources
//app.use("/", express.static(path.resolve(__dirname, "public")))
app.use("/", express.static(path.resolve(__dirname)))
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`)
})
