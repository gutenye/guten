import React, {Component} from "react"
import {render} from "react-dom"
import Todos from "./models"
import Header from "./Header"
import Body from "./Body"

class App extends Component {
  state = {
    todos: [],
    filter: "SHOW_ALL",
  }

  render() {
    var {todos, filter} = this.state
    var {addTodo, setFilter} = this

    return (
      <div>
        <Header addTodo={addTodo} setFilter={setFilter} />
        <Body todos={todos} filter={filter} />
      </div>
    )
  }

  componentDidMount() {
    Todos.fetch().then(todos => this.setState({todos}))
  }

  addTodo = (text) => {
    var todos = Todos.add(text)
    this.setState({todos})
  }

  setFilter = (filter) => {
    this.setState({filter})
  }
}

render(<App />, document.querySelector("#app"))
