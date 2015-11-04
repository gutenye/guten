import React from "react"
import Model from "./model"
import Input from "./input"
import List from "./list"
import Statusbar from "./statusbar"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    window.app = this
  }

  render() {
    return (
      <section>
        <header>
          <Input />
        </header>
        <section>
          <List />
        </section>
        <footer>
          <Statusbar />
        </footer>
      </section>
    )
  }
}

window.model = new Model()
window.rerender = function() {
  app.setState({})
}
React.render(<App />, document.querySelector("#app"))
