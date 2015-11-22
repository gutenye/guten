import React, {Component} from "react"

export class GutInput extends Component {
  static defaultProps = {
    onEnter() {}
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <input {...this.props} onKeyDown={this.keydown.bind(this)} />
    )
  }

  keydown(e) {
    var {onEnter} = this.props
    switch (e.which) {
    case 13: // Enter
      onEnter(e)
      break
    case 27: // Esc
      e.target.value = ""
      break
    }
  }
}
