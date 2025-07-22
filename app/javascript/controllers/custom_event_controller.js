import { Controller } from "@hotwired/stimulus"

class EventBus {
  /* 
  Event: User action and its callback
  Subscription: Explicit declaration that an element is listening for a specific event
  */

  constructor() {
    this.events = {}
  }

  setEvent(eventName, callback) {
    this.events[eventName] = {
      callback
    }
  }
}

export default class extends Controller {
  static targets = []

  connect() {
  }

  disconnect() {
  }
}
