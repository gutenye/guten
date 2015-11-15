import express from "express"
import bodyParser from "body-parser"
import path from "path"
import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import webpackDevMiddleware from "webpack-dev-middleware"
import graphqlHTTP from "express-graphql"
import {schema} from "./common/schema"
import {db} from "./common/database"
import _ from "lodash"
global._ = _
global.pd = console.log.bind(console)

var APP_PORT = 3001
var app = express()
app.use(bodyParser.json())
app.use((req, resp, next) => {
  console.log("%s %s", req.method, req.url, req.query, req.body)
  next()
})

///////////
// Client
//////////
app.use("/react", webpackDevMiddleware(webpack(require("./react/webpack.config")), {noInfo: true}))
app.use("/angular", webpackDevMiddleware(webpack(require("./angular/webpack.config")), {noInfo: true}))
app.use("/common", webpackDevMiddleware(webpack(require("./common/webpack.config")), {noInfo: true}))
app.use("/polymer", express.static("polymer"))
app.use("/", express.static(__dirname))

//////////////
// REST API
/////////////
app.get("/rest/todo", (req, res) => {
  res.json(db.find("todo", req.query))
})

app.get("/rest/todo/:id", (req, res) => {
  res.json(db.find("todo", req.params.id))
})

app.post("/rest/todo", (req, res) => {
  var data = db.insert("todo", req.body)
  res.json({id: data.id})
})

app.put("/rest/todo/:id", (req, res) => {
  db.update("todo", req.params.id, req.body)
  res.json({})
})

app.delete("/rest/todo/:id", (req, res) => {
  db.delete("todo", req.params.id)
  res.json({})
})

////////////
// Graphql API
///////////
app.use("/graphql", graphqlHTTP({schema: schema, graphiql: true}))

app.listen(APP_PORT, () => {
  console.log(`Server is now running on http://localhost:${APP_PORT}`)
})
