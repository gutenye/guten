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
          <input is="gut-input" placeholder="What needs to be done?" autofocus on-enter="enter" on-esc="esc" />
        </div>

        <ul>
          {todos.items.map(item =>
          <li className={cx({completed: item.completed})}>
            <input type="checkbox" checked={item.completed} onChange={this.completedChanged.bind(this, item)}></input>
            <input value={item.title} onChange={this.titleChanged}></input>
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

  completedChanged(item, e) {
    item.completed = e.target.checked
    item.save()
  }

  titleChanged(item, e) {
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
