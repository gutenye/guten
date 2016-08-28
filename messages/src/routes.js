import React from "react"
import {Router, Route, IndexRoute, browserHistory} from "react-router"
import {HomePage, NewMessage, ShowMessage} from "pages"

export default (
  <Router history={browserHistory}>
    <Route path="/">
      <IndexRoute component={HomePage} />
      <Route path="messages">
        <Route path="new" component={NewMessage} />
        <Route path=":id" component={ShowMessage} />
      </Route>
    </Route>
  </Router>
)
