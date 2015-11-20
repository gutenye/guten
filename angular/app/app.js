import {Component, bootstrap, CORE_DIRECTIVES} from "angular2/angular2"
import {Todos} from "./common/todos"
import _ from "lodash-guten"
global._ = _

@Component({
  selector: "app",
  template: `
    <div *ng-if="todos">
    <!-- input -->
    <div>
      <input type="checkbox" (change)="toggleAllCompleted($event)" />
      <input placeholder="What needs to be done?" autofocus (keydown.enter)="enter($event)" (keydown.esc)="esc($event)" />
    </div>

    <!-- list -->
    <ul>
      <li *ng-for="#todo of todos.items" [class.completed]="todo.completed">
        <input type="checkbox" [checked]="todo.completed" (change)="completedChanged(todo, $event)"></input>
        <input [value]="todo.title" (input)="titleChanged(todo, $event)"></input>
        <button (click)="delete(todo)">X</button>
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
  directives: [CORE_DIRECTIVES]
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

  esc(e) {
    e.target.value = ""
  }

  toggleAllCompleted(e) {
    this.todos.toggleAllCompleted(e.target.checked)
    this.todos.saveAll()
  }


  completedChanged(todo, e) {
    todo.completed = e.target.checked
    todo.save()
  }

  titleChanged(todo, e) {
    todo.title = e.target.value
    todo.save()
  }

  delete(todo) {
    this.todos.delete(todo)
  }
}

bootstrap(App)
