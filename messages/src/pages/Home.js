import React, {Component} from "react"
import {withRouter} from "react-router"
import {messages} from "db"
import {NavBar, List, Icon, Flex} from "antd-mobile"

const MessageLine = withRouter(({message: {id, user, message, date}, router}) =>
  <Flex style={{height: 69}} onClick={() => router.push(`/messages/${id}`)}>
    <img src={`/static/avatar${id}.png`} style={{width: 45, height: 45, alignSelf: "center"}} alt="avatar" />
    <div style={{width: 32}} />
    <div className="flex-1" style={{overflow: "hidden"}}>
      <Flex>
        <div className="flex-1">{user}</div>
        <div style={{color: "#8F8F94", fontSize: "0.9rem"}}>{date} <Icon type="right" /></div>
      </Flex>
      <div style={{color: "#8F8F94", fontSize: "0.9rem", whiteSpace: "normal"}}>{message}</div>
    </div>
  </Flex>
)

@withRouter
export default class Home extends Component {
  render() {
    var {props: {router}} = this
    const leftContent = <span className="color-action">Edit</span>
    const rightContent = <span className="color-action" onClick={() => router.push("/messages/new")}><Icon type="edit" /></span>
    return (
      <div>
      <NavBar iconName={null} mode="light" leftContent={leftContent} rightContent={rightContent}>Messages</NavBar>
        <List>
          <List.Body>
            {messages.map((v,i) =>
            <List.Item key={i}>
              <MessageLine message={v} />
            </List.Item>
            )}
          </List.Body>
        </List>
      </div>
    )
  }
}
