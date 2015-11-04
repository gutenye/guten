export class Model {
  constructor() {
    this.todos = [{title: "Hello", completed: false}, {title: "World", completed: true}]
  }

  create(value) {
    this.todos.push({title: value, completed: false})
  }

  delete(index) {
    this.todos.splice(index, 1)
  }

  toggleAllCompleted(completed) {
    this.todos.forEach(function(v, i) {
      v.completed = completed
    })
  }

  getRemaining() {
		return this.todos.filter((v) => v.completed === false)
  }
}
