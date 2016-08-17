import express from "express"
import bodyParser from "body-parser"
import path from "path"
import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import webpackDevMiddleware from "webpack-dev-middleware"
import graphqlHTTP from "express-graphql"
import {Schema} from "./common/schema"
import {db} from "./common/database"
import httpProxy from "http-proxy"
import _ from "lodash"
global._ = _
global.pd = console.log.bind(console)

var APP_PORT = 3003
var app = express()
var proxy = httpProxy.createProxyServer()
app.use(bodyParser.json())
app.use((req, resp, next) => {
  console.log("%s %s", req.method, req.url, req.query, req.body)
  next()
})

////////////
// Graphql API
///////////
app.use("/graphql", graphqlHTTP({schema: Schema, graphiql: true, pretty: true}))

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

///////////
// Client
//////////
app.use("/react", webpackDevMiddleware(webpack(require("./react/webpack.config")), {noInfo: true}))
app.use("/angular", webpackDevMiddleware(webpack(require("./angular/webpack.config")), {noInfo: true}))
// relay use babel 5.0
//app.use("/relay", webpackDevMiddleware(webpack(require("./relay/webpack.config")), {noInfo: true}))
//app.use("/relay", (req, res) => proxy.web(req, res, {target: 'http://127.0.0.1:3008'}))
app.use("/common", webpackDevMiddleware(webpack(require("./common/webpack.config")), {noInfo: true}))
app.use("/polymer", express.static("polymer"))
app.use("/", express.static(__dirname))



app.listen(APP_PORT, () => {
  console.log(`>> localhost:${APP_PORT}`)
})

