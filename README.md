Overview
---------

Setup
-----

For Relay

1. cd relay
2. ./ake mount                       # because relay use babel 5.x version, so can't symlink ../common .  which use ../node_modules
3. ./ake
4. goto localhost:3001

For the Rest

1. ./ake
2. goto localhost:3000

```
ROOT/
  common/
    database.js
    schema.js                     # GraphQL API
    store.js todo.js todos.js     # REST API
  react/
  relay/
  polymer/
  angular/
```

REST API

```
Todos.find("todo").then(todos => {
  todos.create(props)
  todos.delete(record)
  todos.activeCount
  todos.toggleAllCompleted(true)
  ...
})

var todo = new Todo({title: "hello"})   Todo.create({})->Promise
todo.completed = true
todo.save()
todo.delete()

store.find("todo"), ("todo", query), ("todo", id)
store.create("todo", props)
store.update(record)
store.delete(record)
```

GraphQL API

```
`query {
  todos {
    id
    title
    completed
  }
}`

var todos = new Todos(data)
...
```
