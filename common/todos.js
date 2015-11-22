import {store} from "./store"
import {Todo} from "./todo"

export class Todos {
  static find() {
    return store.find("todo").then(items => {
      return Promise.resolve(new Todos(items))
    })
  }

  constructor(items) {
    this.items = items
  }

  create(props) {
    var todo = new Todo(props)
    this.items.push(todo)
    return todo.save()
  }

  delete(record) {
    _.remove(this.items, {id: record.id})
    return record.delete()
  }

  saveAll() {
    return Promise.all(this.items.map(v => v.save()))
  }

  toggleAllCompleted(completed) {
    this.items.forEach(v => {
      v.completed = completed
    })
    return this.saveAll()
  }

  get activeCount() {
    return this.getRemaining().length
  }

  getRemaining() {
		return this.items.filter(v => v.completed === false)
  }

  totalCount() {
    return this.items.length
  }
}
