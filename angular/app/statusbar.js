import {Component, View, NgFor} from "angular2/angular2"

@Component({
  selector: "statusbar",
  properties: ["model"]
})

@View({
  template: `
    <div>
      <span>{{model.getRemaining().length}}</span> {{model.getRemaining().length === 1 ? "item" : "items"}} left
    </div>
  `
})

export class Statusbar {
}
