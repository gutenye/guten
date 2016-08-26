import React from "react"
import {render} from "react-dom"
import ApolloClient from "apollo-client"
import {ApolloProvider} from "react-apollo"
import routes from "./routes"

const client = new ApolloClient()

render(
  <ApolloProvider client={client}>
    {routes}
  </ApolloProvider>,
  document.getElementById("root")
)
