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
  todo {
    id
    title
    completed
  }
}`

var todos = new Todos(data)
...
```
