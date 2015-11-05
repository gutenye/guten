import express from "express"
import path from "path"
import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import webpackDevMiddleware from "webpack-dev-middleware"
import graphqlHTTP from "express-graphql"
import {schema} from "./common/schema"
var app = express()
var APP_PORT = 3001

///////////
// Client
//////////
app.use("/react", webpackDevMiddleware(webpack(require("./react/webpack.config")), {noInfo: true}))
app.use("/angular", webpackDevMiddleware(webpack(require("./angular/webpack.config")), {noInfo: true}))
app.use("/polymer", express.static("polymer"))
app.use("/", express.static(__dirname))

//////////////
// REST API
/////////////
app.get("/todo", (req, res) => {
  res.json(1)
})

////////////
// Graphql API
///////////
app.use("/graphql", graphqlHTTP({schema: schema, graphiql: true}))

app.listen(APP_PORT, () => {
  console.log(`Server is now running on http://localhost:${APP_PORT}`)
})
