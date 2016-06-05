import React, {Component} from "react"
import {connect} from "react-redux"
import * as actions from "./states"

@connect(null, actions)
export default class Footer extends Component {
  render() {
    var {setFilter} = this.props
    return (
      <div>
        <a href="#" onClick={() => setFilter("SHOW_ALL")}>All</a><span> | </span>
        <a href="#" onClick={() => setFilter("SHOW_ACTIVE")}>Active</a>
      </div>
    )
  }
}
