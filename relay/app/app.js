import "babel/polyfill"
import React from "react"
import ReactDOM from "react-dom"
import Relay from "react-relay"
import Home from "./home"
import HomeRoute from "./home-route"

ReactDOM.render(<Relay.RootContainer Component={Home} route={new HomeRoute()} />, document.getElementById("app"))
