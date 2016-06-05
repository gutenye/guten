import {combineReducers} from "redux"

function todos(state=[
  {id: 1, text: "Facebook", completed: true},
  {id: 2, text: "Google", completed: false},
], action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          text: action.text,
          completed: false
        },
        ...state
      ]

    case "COMPLETE_TODO":
      return state.map(todo => todo.id === action.id ? {...todo, completed: true} : todo)

    case "DELETE_TODO":
      return state.filter(todo => todo.id !== action.id)

    default:
      return state
  }
}

function filter(state="SHOW_ALL", action) {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter
    default:
      return  state
  }
}

export function addTodo(text) {
  return {type: "ADD_TODO", text}
}

export function setFilter(filter) {
  return {type: "SET_FILTER", filter}
}

export default combineReducers({todos, filter})
