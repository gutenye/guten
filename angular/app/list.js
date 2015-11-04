import {Component, View, NgFor, CSSClass} from "angular2/angular2"

/*
    .completed label {
      text-decoration: line-through;
    }
   */
@Component({
  selector: "item",
  properties: ["model", "item", "index"]
})

@View({
  template: `
    <div [class]="{completed: item.completed}" [hidden]="editing">
      <input type="checkbox" [checked]="item.completed" (change)="item.completed=$event.target.checked"></input>
      <label (dblclick)="editBegin(eledit)">{{item.title}}</label>
      <button (click)="delete()">X</button>
    </div>
    <div [hidden]="!editing">
      <input #eledit [value]="item.title" (keyup.enter)="editDone($event)" (keyup.escape)="editCancel($event)" (blur)="editDone($event)"></input>
    </div>
  `,
  directives: [CSSClass]
})

export class Item {
  constructor() {
    this.editing = false
  }

  editBegin(eledit) {
    this.editing = true
    // need delay
    //eledit.focus()
  }

  editDone(evt) {
    this.item.title = evt.target.value
    this.editing = false
  }

  editCancel(evt) {
    evt.target.value = this.item.title
    this.editing = false
  }

  delete() {
    this.model.delete(this.index)
  }
}

@Component({
  selector: "list",
  properties: ["model"]
})

@View({
  template: `
    <ul>
      <li *ng-for="#item of model.todos; #index = index">
        <item [model]="model" [item]="item" [index]="index" />
      </li>
    </ul>
  `,
  directives: [NgFor, Item]
})

export class List {
}
