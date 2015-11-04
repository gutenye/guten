import {Component, View} from "angular2/angular2"

@Component({
  selector: "query",
  properties: ["model"]
})

@View({
  template: `
<div>
  <input type="checkbox" (change)="toggleAllCompleted($event)" />
  <input placeholder="What needs to be done?" autofocus (keyup)="keyup($event)" />
</div>
  `
})

export class Query {
  keyup(evt) {
    switch(evt.keyCode) {
      case 13: // Enter
        this.model.create(evt.target.value)
        evt.target.value = ""
        break
      case 27: // Esc
        evt.target.value = ""
        break
    }
  }

  toggleAllCompleted(evt) {
    this.model.toggleAllCompleted(evt.target.checked)
  }
}
