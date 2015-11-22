import "babel/polyfill"
import React from "react"
import ReactDOM from "react-dom"
import Relay from "react-relay"
import AppRoute from "./route"
import {Todos} from "./common/todos"
import cx from "classnames"
global.cx = cx

class AppView extends React.Component {
  render() {
    var {me} = this.props
    var todos = new Todos(me.todos.edges.map(v => v.node))

    return (
      <div>
        <div>
          <input type="checkbox" onChange={todos.toggleAllCompleted} />
          <input placeholder="What needs to be done?" autofocus onKeyDown={this.keydown.bind(this)} />
        </div>

        <ul>
          {todos.items.map(item =>
          <li className={cx({completed: item.completed})}>
            <input type="checkbox" checked={item.completed} onChange={this.setCompleted.bind(this, item)}></input>
            <input value={item.title} onChange={this.setTitle}></input>
            <button onClick={this.delete}>X</button>
          </li>
          )}
        </ul>

        <flex>
          <div>{todos.activeCount} items left</div>
          <div>All Active Completed</div>
          <div>Clear completed</div>
        </flex>
      </div>
    )
  }

  keydown(e) {
    switch (e.which) {
    case 13: // Enter
      this.todos.create({title: e.target.value})
      this.setState({})
      e.target.value = ""
      break
    case 27: // Esc
      e.target.value = ""
      break
    }
  }

  setCompleted(item, e) {
    item.completed = e.target.checked
    item.save()
  }

  setTitle(item, e) {
    item.title = e.target.value
    item.save()
  }
}

var App = Relay.createContainer(AppView, {
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

ReactDOM.render(<Relay.RootContainer Component={App} route={new AppRoute()} />, document.getElementById("app"))
