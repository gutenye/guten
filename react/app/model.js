export default class Model {
  constructor() {
    this.todos = [{title: "Hello", completed: false}, {title: "World", completed: true}]
  }

  create(value) {
    this.todos.push({title: value, completed: false})
    rerender()
  }

  delete(index) {
    this.todos.splice(index, 1)
    rerender()
  }

  toggleAllCompleted(completed) {
    this.todos.forEach(function(v, i) {
      v.completed = completed
    })
    rerender()
  }
}
