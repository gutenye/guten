import React from "react"
import cx from "classnames"

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {editing: false}
  }

  render() {
    var {editing} = this.state
    var {item} = this.props

    var css = `
.completed label {
  text-decoration: line-through;
}
`
    return (
      <div className={cx({editing: editing})}>
        <div className={cx({completed: item.completed})} >
          <input type="checkbox" checked={item.completed} onChange={this.check.bind(this)}></input>
          <label onDoubleClick={this.editBegin.bind(this)}>{item.title}</label>
          <button onClick={this.delete.bind(this)}>X</button>
        </div>
        <div>
          <input className="edit" ref="edit" onKeyUp={this.edit.bind(this)} onBlur={this.editDone.bind(this)} autofocus></input>
        </div>
      </div>
    )
  }

  check(evt) {
    var {item} = this.props
    item.completed = evt.target.checked
    this.setState({})
    rerender()
  }

  editBegin() {
    var {item} = this.props
    this.setState({editing: true})
    var node = React.findDOMNode(this.refs.edit)
    node.value = item.title
    node.focus()
  }

  edit(evt) {
    switch(evt.keyCode) {
      case 13: // Enter
        this.editDone(evt)
        break
      case 27: // Esc
        this.editCancel(evt)
        break
    }
  }

  editDone(evt) {
    var {item} = this.props
    item.title = evt.target.value
    this.setState({editing: false})
  }

  editCancel(evt) {
    var {item} = this.props
    evt.target.value = item.title
    this.setState({editing: false})
  }

  delete(evt) {
    var {index} = this.props
    model.delete(index)
  }
}

export default class List extends React.Component {
  render() {
    return (
      <ul>
        {model.todos.map( (v, i) => {
          return <li><Item item={v} index={i} /></li>
        })}
      </ul>
    )
  }
}
