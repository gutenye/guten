### Redux way

```
state = {
  todos: [{id, text, completed}],
  filter: "SHOW_ALL", "SHOW_ACTIVE"
}
  filteredTodos: todos filter

View

  @connect(null, {addTodo, setFilter})
  <Header>

  @connect({filteredTodos}, {completeTodo})
  <Body>
    <Todo todo completeTodo>

Actions

  ADD_TODO        [{id: 1, text: action.text, completed: false}, ...state]
  COMPLTE_TODO    state.map(todo => todo.id === action.id ? {...todo, completed: true} : todo)
  DELETE_TODO     state.filter(todo => todo.id !== action.id)

  SET_FILTER      "SHOW_ALL"
```

The Flow

```
addTodo -> change state.todos -> re-render
```
