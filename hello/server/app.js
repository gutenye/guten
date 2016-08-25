const express = require("express")
const {makeExecutableSchema, addResolveFunctionsToSchema, mockServer}  = require("graphql-tools")
const {apolloExpress, graphiqlExpress} = require("apollo-server")
const bodyParser = require("body-parser")
global.pd = console.log.bind(console)
var app = express()

const users = [
  {id: "1", name: "Guten"}
]
const comments = [
  {id: "1", content: "comment1"},
  {id: "2", content: "comment2"},
]
const posts = [
  {id: "1", title: "Facebook"},
  {id: "2", title: "Google"},
  {id: "3", title: "Apple"},
  {id: "4", title: "Microsoft"},
  {id: "5", title: "Amazon"},
]

const SchemaDef = `
  schema {
    query: Query
  }

  type Query {
    user(id: Int, a: Int): User
    post: Post
    posts(page: Int = 1, limit: Int = 10): [Post]
  }

  type User {
    id: ID!
    name: String
  }

  type Post {
    id: ID!
    title: String
    comments: [Comment]
  }

  type Comment {
    id: ID!
    content: String
  }

  type Tag {
    id: ID!
    name: String
  }
`

const resolvers = {
  Query: {
    user(root, args, context) {
      return users[0]
    },

    post() {
      return posts[0]
    },

    posts(root, {page, limit}) {
      var offset = limit * (page-1)
      return posts.slice(offset, offset+limit)
    },
  },

  Post: {
    comments() {
      return comments
    },
  },
}

const schema = makeExecutableSchema({typeDefs: [SchemaDef], resolvers: resolvers})

app.use(bodyParser.json())
app.post("/graphql", apolloExpress({schema}))
app.get("/graphql", graphiqlExpress({endpointURL: "/graphql"}))

app.listen(3005, () => {
  console.log("> Listen on localhost:3005/graphql")
})
