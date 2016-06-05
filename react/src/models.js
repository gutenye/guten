class Todos {
  todos = [
    {id: 1, text: "Facebook", completed: true},
    {id: 2, text: "Google", completed: false}
  ]

  fetch() {
    return Promise.resolve(this.todos)
  }

  add(text) {
    this.todos.unshift({
      id: this.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      text,
      completed: false
    })
    return this.todos
  }
}

export default new Todos()
