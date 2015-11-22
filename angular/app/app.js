import _ from "lodash-guten"
import {Component, bootstrap, CORE_DIRECTIVES} from "angular2/angular2"
import {Todos} from "./common/todos"
import {GutInput} from "./gut-input"
global._ = _

@Component({
  selector: "app",
  template: `
    <div *ng-if="todos">
    <!-- input -->
    <div>
      <input type="checkbox" (change)="todos.toggleAllCompleted($event.target.checked)" />
      <input gut-input placeholder="What needs to be done?" autofocus (keydown.enter)="enter($event)" />
    </div>

    <!-- list -->
    <ul>
      <li *ng-for="#todo of todos.items" [class]="{completed: todo.completed}">
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
  directives: [CORE_DIRECTIVES, GutInput]
})

class App {
  constructor() {
    Todos.find().then(todos => {
      this.todos = todos
    })
  }

  enter(e) {
    this.todos.create({title: e.target.value})
    e.target.value = ""
  }
}

bootstrap(App)
