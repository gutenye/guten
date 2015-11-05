
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

}


export class Todo extends Object {
  toggleAllCompleted(completed) {
    this.todos.forEach(v => {
      v.completed = completed
    })
  }

  getRemaining() {
		return this.todos.filter((v) => v.completed === false)
  }
}

export var store = new Store()
