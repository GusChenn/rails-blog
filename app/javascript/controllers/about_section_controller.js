import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "experiencesDrawer",
  ];

  toggleDrawer() {
    this.experiencesDrawerTarget.classList.toggle("open");
  }
}
