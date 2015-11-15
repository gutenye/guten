import React from "react"
import ReactDom from "react-dom"
import {Todos} from "./common/todos"
import _ from "lodash-guten"
import cx from "classnames"
global._ = _
global.cx = cx

var App = React.createClass({
  getInitialState() {
    return {
      todos: null
    }
  },

  componentWillMount() {
    window.app = this
    Todos.find().then(todos => {
      this.setState({todos: todos})
    })
  },

  render() {
    var {todos} = this.state
    if (!todos)
      return <div />
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
  },

  completedChanged(item, e) {
    item.completed = e.target.checked
    item.save()
  },

  titleChanged(item, e) {
    item.title = e.target.value
    item.save()
  },
})

window.rerender = function() {
  app.setState({})
}
ReactDom.render(<App />, document.querySelector("#app"))
