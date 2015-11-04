import React from "react"

export default class Statusbar extends React.Component {
  render() {
    var activeCount = model.todos.filter(function(v) {
      return v.completed === false
    }).length

    return (
      <div>
        <span>{activeCount}</span> items left
      </div>
    )
  }
}
