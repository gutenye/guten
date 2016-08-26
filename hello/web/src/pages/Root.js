import React, {Component} from "react"
import {Link, IndexLink} from "react-router"

export default class Root extends Component {
  render() {
    var {props: {children}} = this
    return (
      <div>
        <div>
          <IndexLink to="/">Home</IndexLink><span> | </span>
          <Link to="/login">Login</Link><span> | </span>
          <Link to="/protected">Protected</Link>
        </div>
        {children}
      </div>
    )
  }
}
