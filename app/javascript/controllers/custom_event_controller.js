import { Controller } from "@hotwired/stimulus"

class EventBus {
  constructor() {
    this.events = {}
  }

  broadcastEvent(eventName, eventData) {
    const subscribedElements = this.events[eventName]?.subscribedElements

    if(!subscribedElements) return

    subscribedElements.forEach(subscription => {
      subscription.callback.call(subscription.element, eventData)
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
  constructor({ eventBus, elementData }) {
    this.eventBus = eventBus
    this.elementData = elementData
  }

  subscribe(eventName, callback) {
    this.eventBus.subscribeElement(this, eventName, callback)
  }

  broadcastEventToEventBus(eventName, eventData) {
    this.eventBus.broadcastEvent(eventName, eventData)
  }
}

export default class extends Controller {
  static targets = []

  connect() {
    const eventBus = new EventBus()
    const eventBusElement1 = new EventBusElement({
      eventBus,
      elementData: {
        name: 'first element'
      }
    })
    const eventBusElement2 = new EventBusElement({
      eventBus,
      elementData: {
        name: 'second element'
      }
    })

    eventBusElement1.subscribe(
      'goodbye',
      function(eventData) {
        console.log(`Bye from ${this.elementData.name} triggered ${eventData.elementName}`)
      }
    )

    eventBusElement2.subscribe(
      'goodbye',
      function(eventData) {
        console.log(`Goodbye from ${this.elementData.name} triggered by ${eventData.elementName}`)
      }
    )

    eventBusElement2.broadcastEventToEventBus('goodbye', { elementName: eventBusElement2.elementData.name })
  }
}
