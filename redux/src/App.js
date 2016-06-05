import React, {Component} from "react"
import {render} from "react-dom"
import {createStore, combineReducers} from "redux"
import {Provider} from "react-redux"
import reducers from "./states"
import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"

const store = createStore(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Header />
          <Body />
          <Footer />
        </div>
      </Provider>
    )
  }
}

render(<App />, document.querySelector("#app"))
