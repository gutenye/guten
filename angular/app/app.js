import {Component, enableProdMode} from "angular2/core"
import {bootstrap} from "angular2/platform/browser"
import {Todos} from "./common/todos"
import {GutInput} from "./gut-input"
import _ from "lodash-guten"
global._ = _

@Component({
  selector: "app",
  template: `
    <div *ngIf="todos">
    <!-- input -->
    <div>
      <input type="checkbox" (change)="todos.toggleAllCompleted($event.target.checked)" />
      <input gutInput placeholder="What needs to be done?" autofocus (keydown.enter)="enter($event)" />
    </div>

    <!-- list -->
    <ul>
      <li *ngFor="#todo of todos.items" [class]="{completed: todo.completed}">
        <input type="checkbox" [checked]="todo.completed" (change)="todo.setCompleted($event.target.checked)"></input>
        <input [value]="todo.title" (input)="todo.setTitle($event.target.value)"></input>
        <button (click)="todos.delete(todo)">X</button>
      </li>
    </ul>

    <!-- status -->
    <flex>
      <div>{{todos.activeCount}} items left</div>
      <div>All Active Completed</div>
      <div>Clear completed</div>
    </flex>
    </div>
  `,
  directives: [GutInput]
})

class App {
  constructor() {
    Todos.find().then(todos => {
      this.todos = todos
    })
  }

  enter(e) {
    dispatch("create todo", {title: e.target.value})
    //this.todos.create({title: e.target.value})
    e.target.value = ""
  }
}

bootstrap(App)
  .catch(err => console.error(err))
