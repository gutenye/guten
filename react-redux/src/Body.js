import React, {Component} from "react"
import {connect} from "react-redux"
import * as actions from "./states"

@connect(
  state => {
    var todos
    switch (state.filter) {
      case "SHOW_ALL":
        todos = state.todos
        break
      case "SHOW_ACTIVE":
        todos = state.todos.filter(t => !t.completed)
        break
    }
    return {todos}
  }
)
export default class Body extends Component {
  render() {
    var {todos} = this.props
    return (
      <div>
        {todos.map(todo =>
        <div key={todo.id}>{todo.text}</div>
        )}
      </div>
    )
  }
}
