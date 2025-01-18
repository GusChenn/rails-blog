import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "modal",
  ];

  connect() {
    this.modalTarget.addEventListener('click', this.handleClickOutside.bind(this))
  }

  disconnect() {
    this.modalTarget.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  handleClickOutside(event) {
    if (event.target === this.modalTarget) {
      this.closeModal();
    }
  }

  openModal() {
    this.modalTarget.showModal();
  }

  closeModal() {
    this.modalTarget.close();
  }
}
