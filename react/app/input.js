import React from "react"

export default class Input extends React.Component {
  render() {
    return (
      <div>
        <input type="checkbox" onChange={this.toggleAllCompleted.bind(this)} />
        <input placeholder="What needs to be done?" autofocus onKeyUp={this.keyup.bind(this)} />
      </div>
    )
  }

  keyup(evt) {
    switch(evt.keyCode) {
      case 13: // Enter
        model.create(evt.target.value)
        evt.target.value = ""
        break
      case 27: // Esc
        evt.target.value = ""
        break
    }
  }

  toggleAllCompleted(evt) {
    model.toggleAllCompleted(evt.target.checked)
  }
}
