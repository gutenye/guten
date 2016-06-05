import React, {Component} from "react"

export default class Body extends Component {
  render() {
    var todos = this.getFilteredTodos()
    return (
      <div>
        {todos.map(todo =>
        <div key={todo.id}>{todo.text}</div>
        )}
      </div>
    )
  }

  getFilteredTodos() {
    var {todos, filter} = this.props
    switch (filter) {
      case "SHOW_ALL":
        return todos
      case "SHOW_ACTIVE":
        return todos.filter(v => !v.completed)
    }
  }
}
