import {Component, View, bootstrap, NgIf} from "angular2/angular2"
import {Model} from "./model"
import {Query} from "./query"
import {List} from "./list"
import {Statusbar} from "./statusbar"

@Component({
  selector: "app"
})

@View({
  template: `
<section>
  <header>
    <query [model]="model" />
  </header>
  <section>
    <list [model]="model" />
  </section>
  <footer>
    <statusbar [model]="model" />
  </footer>
</section>
  `,
  directives: [NgIf, Query, List, Statusbar]
})

export class App {
  constructor() {
    this.model = new Model()
  }
}

bootstrap(App)
