import { Controller } from "@hotwired/stimulus"

class EventBus {
  constructor() {
    this.events = {}
  }

  broadcastEvent(eventName) {
    const subscribedElements = this.events[eventName]?.subscribedElements

    if(!subscribedElements) return

    subscribedElements.forEach(subscription => {
      subscription.callback.call(subscription.element)
    })
  }

  subscribeElement(element, eventName, callback) {
    if(!this.events[eventName]) {
      this._createEvent(eventName)
    }

    this.events[eventName].subscribedElements.push({
      element,
      callback
    })
  }

  _createEvent(eventName) {
    this.events[eventName] = {
      subscribedElements: [],
    }
  }
}

class EventBusElement {
  constructor({ eventBus, data }) {
    this.eventBus = eventBus
    this.data = data
  }

  subscribe(eventName, callback) {
    this.eventBus.subscribeElement(this, eventName, callback)
  }

  broadcastEventToEventBus(eventName) {
    this.eventBus.broadcastEvent(eventName)
  }
}

export default class extends Controller {
  static targets = []

  connect() {
    // 1. Create the event bus and its elements
    const eventBus = new EventBus()
    const eventBusElement1 = new EventBusElement({
      eventBus,
      data: {
        name: 'first element'
      }
    })
    const eventBusElement2 = new EventBusElement({
      eventBus,
      data: {
        name: 'second element'
      }
    })

    // 3. Subscribe the elements to the event bus
    eventBusElement1.subscribe(
      'goodbye',
      function() {
        console.log(`Bye from ${this.data.name}`)
      }
    )

    eventBusElement2.subscribe(
      'goodbye',
      function() {
        console.log(`Goodbye from ${this.data.name}`)
      }
    )

    // 3. Make the event bus trigger the callback
    eventBusElement2.broadcastEventToEventBus('goodbye')
  }
}
