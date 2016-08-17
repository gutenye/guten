import React, {Component} from "react"
import {render} from "react-dom"
import Relay, {RootContainer} from "react-relay"

class App extends Component {
  render() {
    var {me} = this.props
    var todos = me.todos.edges
    return (
      <div>
        {todos.map(v => {
          var {id} = v.node
          return <div key={id}>{id}</div>
        })}
      </div>
    )
  }
}

App = Relay.createContainer(App, {
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        todos(first: 10) {
          edges {
            node {
              id,
              title,
              completed,
            },
          },
        },
      }
    `,
  },
})

class Route extends Relay.Route {
  static queries = {
    me: () => Relay.QL`
      query {
        me
      }
    `,
  }
  static routeName = "AppRoute"
}

render(<RootContainer Component={App} route={new Route()} />, document.getElementById("app"))
