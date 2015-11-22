import {store} from "./store"

store.find = function(type, arg) {
  if (_.isString(arg))
    return _.fetch(`/rest/todo/${arg}`).then(data => new Todo(data))
  else
    return _.fetch("/rest/todo", {param: arg}).then(data => data.map(v => new Todo(v)))
}

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

  setCompleted(value) {
    this.completed = value
    this.save()
  }

  setTitle(value) {
    this.title = value
    this.save()
  }
}
