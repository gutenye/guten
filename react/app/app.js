import _ from "lodash-guten"
import cx from "classnames"
import React, {Component} from "react"
import ReactDOM from "react-dom"
import {Todos} from "./common/todos"
import {GutInput} from "./gut-input"
global._ = _
global.cx = cx

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: {items: []}
    }

    Todos.find().then(todos => {
      this.setState({todos: todos})
    })
  }

  render() {
    var {todos} = this.state

    if (!todos)
      return <div />
    return (
      <div>
        <div>
          <input type="checkbox" onChange={this.toggleAllCompleted} />
          <GutInput placeholder="What needs to be done?" autofocus onEnter={this.onEnter} />
        </div>

        <ul>
          {todos.items.map((todo, i) =>
          <li className={cx({completed: todo.completed})} key={i}>
            <input type="checkbox" checked={todo.completed} onChange={this.setCompleted.bind(this, todo)}></input>
            <input value={todo.title} onChange={this.setTitle}></input>
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

  onEnter = (e) => {
    var {todos} = this.state
    todos.create({title: e.target.value}).then(() => {
      this.setState({todos: todos})
    })
    e.target.value = ""
  };

  toggleAllCompleted = (e) => {
    var {todos} = this.state
    todos.toggleAllCompleted(e.target.checked)
    this.setState({todos: todos})
  };

  setCompleted = (todo, e) => {
    var {todos} = this.state
    todo.setCompleted(e.target.checked)
    this.setState({todos: todos})
  };

  setTitle = (todo, e) => {
    var {todos} = this.state
    todo.setTitle(e.target.value)
    this.setState({todos: todos})
  };

  delete = (todo, e) => {
    var {todos} = this.state
    todos.delete(todo)
    this.setState({todos: todos})
  };
}

ReactDOM.render(<App />, document.querySelector("#app"))
