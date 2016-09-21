import React, {Component} from "react"
import {find} from "lodash"
import {messages} from "db"
import {withRouter} from "react-router"
import {NavBar} from "antd-mobile"
import {ReplayBar} from "components"

@withRouter
export default class ShowMessage extends Component {
  render() {
    var {props: {router, params: {id}}} = this
    var message = find(messages, {id})
    var {user} = message
    return (
      <div>
        <NavBar mode="light" leftContent="Messages" onLeftClick={() => router.push("/")} rightContent="Details">{user}</NavBar>
        <div style={{height: 100}}></div>
        <ReplayBar />
      </div>
    )
  }
}
