import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    hljs.highlightElement(this.element)
  }
}
