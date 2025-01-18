import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "canvas",
  ];

  connect() {
    this.drawing = false
    this.canvasContext = this.canvasTarget.getContext("2d")
    this.canvasContext.lineCap = "round"
    this.canvasContext.lineWidth = 2
  }

  startPath() {
    this.drawing = true
    this.canvasContext.beginPath()
  }

  closePath() {
    this.drawing = false
    this.canvasContext.closePath()
  }

  draw(e) {
    if (!this.drawing) return

    const relativeX = e.clientX - this.canvasTarget.getBoundingClientRect().left
    const relativeY = e.clientY - this.canvasTarget.getBoundingClientRect().top

    this.canvasContext.lineTo(relativeX, relativeY);

    this.canvasContext.stroke();

    this.canvasContext.beginPath();

    this.canvasContext.moveTo(relativeX, relativeY);
  }

  clearCanvas() {
    this.canvasContext.clearRect(0, 0, this.canvasTarget.width, this.canvasTarget.height);
  }

  saveDrawing(event) {
    event.preventDefault()

    const drawingData = this.canvasTarget.toDataURL() // converts canvas to base64 image

    const formData = new FormData()
    formData.append('drawing[image_data]', drawingData)

    fetch('/public_drawing_board', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
      },
      body: formData
    }).then(response => {
      if (response.ok) {
        // Handle success
        console.log('Drawing saved!')
      }
    })
  }
}
