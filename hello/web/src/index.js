import React from "react"
import {render} from "react-dom"
import ApolloClient from "apollo-client"
import {ApolloProvider} from "react-apollo"
import App from "./App"

const client = new ApolloClient()

render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById("root"))
