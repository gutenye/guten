import React, {Component} from "react"
import {WingBlank, Icon, InputItem, Flex} from "antd-mobile"

export default class ReplayBar extends Component {
  render() {
    return (
      <WingBlank size={16}>
        <Flex>
          <Icon type="camera" />
          <InputItem style={{flex: 1}} placeholder="Message" />
          <span>Send</span>
        </Flex>
      </WingBlank>
    )
  }
}
