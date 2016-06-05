import React, {Component} from "react"
import {connect} from "react-redux"
import * as actions from "./states"

@connect(null, actions)
export default class Header extends Component {
  render() {
    return (
      <div>
        <input onKeyDown={this.onKeyDown} />
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
