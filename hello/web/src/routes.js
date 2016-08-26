import React from "react"
import {Router, browserHistory, Route, IndexRoute} from "react-router"
import {Root, Home, Login, Protected} from "pages"

var firstEntry = true
function requireAuth(next, replace, callback) {
  if (firstEntry) {
    fetch("/load-auth").then(() => {
      callback()
    }).catch(() => {
      location.href ="/login"
    })
    firstEntry = false
  } else {
    callback()
  }
}

export default
  <Router history={browserHistory}>
    <Route path="/" component={Root} >
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="protected" component={Protected} onEnter={requireAuth} />
    </Route>
  </Router>

