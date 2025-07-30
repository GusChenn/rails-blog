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
  static targets = ['element']

  connect() {
    const eventBus = new EventBus()

    this.eventBusElements = this.elementTargets.map(element => {
      return new EventBusElement({
        eventBus,
        elementData: {
          row: element.dataset.row,
          col: element.dataset.col,
          node: element
        }
      })
    })

    this.eventBusElements.forEach(eventBusElement => {
      eventBusElement.subscribe('click', function(eventData) {
        const { row: clickedRow, col: clickedCol } = eventData

        if(this.elementData.row === clickedRow && this.elementData.col === clickedCol) {
          return
        } else if (this.elementData.row < clickedRow) {
          console.log(this.elementData.node)
        }
      })
    })
  }

  handleElementClick(event) {
    const { row, col } = event.currentTarget.dataset

    const clickedEventBusElement = this.eventBusElements.find(element => {
      return element.elementData.row === row && element.elementData.col === col
    })

    if (clickedEventBusElement) {
      clickedEventBusElement.broadcastEventToEventBus('click', {
        row,
        col,
      })
    }
  }
}
