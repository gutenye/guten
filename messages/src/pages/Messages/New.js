import React, {Component} from "react"
import {withRouter} from "react-router"
import {NavBar, Icon, InputItem, Flex, WingBlank} from "antd-mobile"
import {ReplayBar} from "components"

@withRouter
export default class NewMessage extends Component {
  render() {
    var {props: {router}} = this
    var rightContent = <span className="color-action" onClick={() => router.push("/")}>Cancel</span>
    return (
      <div>
        <NavBar mode="light" iconName={null} rightContent={rightContent}>New Message</NavBar>
        <WingBlank size={16}><Flex>
          <span>To: </span>
          <InputItem style={{flex: 1}} />
          <Icon type="plus-circle-o" />
        </Flex></WingBlank>
        <div style={{height: 100}}></div>
        <ReplayBar />
      </div>
    )
  }
}
