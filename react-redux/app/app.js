import _ from "lodash-guten"
import cx from "classnames"
import React, {Component} from "react"
import ReactDom from "react-dom"
import {Todos} from "./common/todos"
import {GutInput} from "./gut-input"
global._ = _
global.cx = cx

class App extends Component {
  constructor(props) {
    super(props)
    Todos.find().then(todos => {
      this.todos = todos
      this.setState({})
    })
  }

  render() {
    var todos = this.todos
    if (!todos)
      return <div />
    return (
      <div>
        <div>
          <input type="checkbox" onChange={this.toggleAllCompleted} />
          <GutInput placeholder="What needs to be done?" autofocus onEnter={this.onEnter.bind(this)} />
        </div>

        <ul>
          {todos.items.map(todo =>
          <li className={cx({completed: todo.completed})}>
            <input type="checkbox" checked={todo.completed} onChange={this.setCompleted.bind(this, todo)}></input>
            <input value={todo.title} onChange={this.setTitle.bind(this, todo)}></input>
            <button onClick={this.delete.bind(this, todo)}>X</button>
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

  onEnter(e) {
    this.todos.create({title: e.target.value}).then(() => {
      this.setState({})
    })
    e.target.value = ""
  }

  toggleAllCompleted(e) {
    this.todos.toggleAllCompleted(e.target.checked)
    this.setState({})
  }

  setCompleted(todo, e) {
    todo.setCompleted(e.target.checked)
    this.setState({})
  }

  setTitle(todo, e) {
    todo.setTitle(e.target.value)
    this.setState({})
  }

  delete(todo, e) {
    this.todos.delete(todo)
    this.setState({})
  }
}

ReactDom.render(<App />, document.querySelector("#app"))
