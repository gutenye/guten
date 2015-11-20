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
    return Todo.create(props).then(todo => {
      this.items.push(todo)
    })
  }

  delete(record) {
    return record.delete().then(() => {
      _.remove(this.items, {id: record.id})
    })
  }

  saveAll() {
    return Promise.all(this.items.map(v => v.save()))
  }

  toggleAllCompleted(completed) {
    this.items.forEach(v => {
      v.completed = completed
    })
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
