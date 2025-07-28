import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="code-runner"
export default class extends Controller {
  static targets = [ "source", "output" ]
  static values = { workerUrl: String }

  run() {
    this.outputTarget.innerHTML = "<span>Executing...</span>";
    const code = this.sourceTarget.content.textContent;
    const worker = new Worker(this.workerUrlValue);

    worker.onmessage = (event) => {
      this.outputTarget.innerHTML = "";
      const lines = event.data;

      lines.forEach((lineText, index) => {
        // The staggered delay also helps ensure animations don't all try to start in the exact same frame.
        setTimeout(() => {
          this.addLine(lineText);
        }, index * 600);
      });

      worker.terminate();
    };

    worker.onerror = (event) => {
      this.outputTarget.innerHTML = "";
      this.addLine(`Error: ${event.message}`);
      worker.terminate();
    };

    worker.postMessage(code);
  }

  /**
   * Creates a new div for a line, adds it to the output,
   * and triggers the CSS transition reliably.
   * @param {string} text The text content for the line.
   */
  addLine(text) {
    const lineElement = document.createElement('div');
    lineElement.textContent = text || ' ';
    lineElement.className = 'output-line';

    this.outputTarget.appendChild(lineElement);

    // --- THE FIX ---
    // By reading a property like offsetHeight, we force the browser to stop
    // and calculate the layout of the element in its current state (off-screen).
    // This guarantees the transition will have a starting point to animate from.
    // The 'void' operator is used to indicate we are intentionally not using the value.
    void lineElement.offsetHeight;

    // Now, when we add the class, the browser is guaranteed to see the state change.
    lineElement.classList.add('is-visible');
  }
}
