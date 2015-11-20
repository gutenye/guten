import React, {Component} from "react"
import ReactDom from "react-dom"
import {Todos} from "./common/todos"
import _ from "lodash-guten"
import cx from "classnames"
global._ = _
global.cx = cx

class App extends Component {
  constructor(props) {
    super(props)
    window.app = this
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
          <input placeholder="What needs to be done?" autofocus onKeyDown={this.keydown} />
        </div>

        <ul>
          {todos.items.map(item =>
          <li className={cx({completed: item.completed})}>
            <input type="checkbox" checked={item.completed} onChange={this.completedChanged.bind(this, item)}></input>
            <input value={item.title} onChange={this.titleChanged.bind(this, item)}></input>
            <button onClick={this.delete.bind(this, item)}>X</button>
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
      this.todos.create({title: e.target.value}).then(() => {
        this.setState({})
      })
      e.target.value = ""
      break
    case 27: // Esc
      e.target.value = ""
      break
    }
  }

  toggleAllCompleted(e) {
    this.todos.toggleAllCompleted(e.target.checked)
    this.todos.saveAll().then(() => {
      this.setState({})
    })
  }

  completedChanged(item, e) {
    item.completed = e.target.checked
    item.save().then(() => {
      this.setState({})
    })
  }

  titleChanged(item, e) {
    item.title = e.target.value
    item.save().then(() => {
      this.setState({})
    })
  }

  delete(item, e) {
    this.todos.delete(item).then(() => {
      this.setState({})
    })
  }
}

ReactDom.render(<App />, document.querySelector("#app"))
