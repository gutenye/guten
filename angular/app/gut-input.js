import {Directive} from "angular2/angular2"

@Directive({
  selector: "[gut-input]",
  host: {
    "(keydown.esc)": "esc($event)"
  }
})
export class GutInput {
  esc(e) {
    e.target.value = ""
  }
}
