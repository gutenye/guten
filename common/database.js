class Database {
  constructor() {
    this.data = {
      todo: [
        {id: 1, title: "hello", completed: false},
        {id: 2, title: "world", completed: true}
      ]
    }
  }

  // find("todo")
  // find("todo", 1)
  // find("todo", {query})
  find(type, id) {
    if (id)
      return this.data[type][id]
    else
      return this.data[type]
  }

  insert(type, item) {
    var items = this.data[type] = this.data[type] || []
    items.push(item)
  }

  delete(type, id) {
    _.remove(this.data[type], {id: id})
  }
}

export var db = new Database()
