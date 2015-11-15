import {store} from "./store"

export class Todo {
  static create(props) {
    var todo = new Todo(props)
    return todo.save().then(() => {
      return todo
    })
  }

  constructor(props) {
    Object.assign(this, {
      title: "",
      completed: false
    }, props)
  }

  save() {
    if (this.id) {
      return store.update(this)
    } else {
      return store.create("todo", this).then(data => {
        this.id = data.id
        return Promise.resolve(data)
      })
    }
  }

  delete() {
    return store.delete(this)
  }
}
