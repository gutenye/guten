class Store {
  // move to todo.js, for angular traceur does not support cycle import.
  /*
  find(type, arg) {
    if (_.isString(arg))
      return _.fetch(`/rest/todo/${arg}`).then(data => new Todo(data))
    else
      return _.fetch("/rest/todo", {param: arg}).then(data => data.map(v => new Todo(v)))
  }
 */

  create(type, data) {
    return _.fetch("/rest/todo", {method: "POST", body: data})
  }

  update(record) {
    return _.fetch(`/rest/todo/${record.id}`, {method: "PUT", body: record})
  }

  delete(record) {
    return _.fetch(`/rest/todo/${record.id}`, {method: "DELETE"})
  }
}

export var store = new Store()
