import React from "react"
import Relay from "react-relay"

class App extends React.Component {
  render() {
    var {me} = this.props
    return (
      <div>
        <ul>
          {me.todos.edges.map(edge =>
            <li>{edge.node.title} (ID: {edge.node.id})</li>
          )}
        </ul>
      </div>
    )
  }
}

export default Relay.createContainer(App, {
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
