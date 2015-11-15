import {store} from "./store"

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
      _.remove(this.lodos, {id: record.id})
    })
  }

  toggleAllCompleted(completed) {
    this.items.forEach(v => {
      v.completed = completed
    })
  }

  getRemaining() {
		return this.items.filter(v => v.completed === false)
  }

  activeCount() {
    return this.getRemaing().length
  }

  totalCount() {
    return this.items.length
  }
}
