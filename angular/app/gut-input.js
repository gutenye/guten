import {Directive} from "angular2/core"

@Directive({
  selector: "[gutInput]",
  host: {
    "(keydown.esc)": "esc($event)"
  }
})
export class GutInput {
  esc(e) {
    e.target.value = ""
  }
}
