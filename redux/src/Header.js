import React, {Component} from "react"
import {connect} from "react-redux"
import * as actions from "./states"

@connect(null, actions)
export default class Header extends Component {
  render() {
    var {setFilter} = this.props
    var {onKeyDown} = this
    return (
      <div>
        <input onKeyDown={onKeyDown} />
        <a href="#" onClick={() => setFilter("SHOW_ALL")}>All</a><span> | </span>
        <a href="#" onClick={() => setFilter("SHOW_ACTIVE")}>Active</a>
      </div>
    )
  }

  onKeyDown = (e) => {
    var {addTodo} = this.props
    if (e.keyCode === 13) { // Enter
      addTodo(e.target.value)
      e.target.value = ""
    }
  }
}
