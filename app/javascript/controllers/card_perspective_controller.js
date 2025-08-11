import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["card", "mask"];
  static classes = ["isMoving"];

  connect() {
    this.isFlipped = false;
    this.ticking = false;
    this.lastX = 0;
    this.lastY = 0;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.update = this.update.bind(this);
  }

  handleMouseMove(event) {
    this.lastX = event.clientX;
    this.lastY = event.clientY;

    if (!this.ticking) {
      window.requestAnimationFrame(this.update);
      this.ticking = true;
    }
  }

  update() {
    const card = this.cardTarget;
    const rect = card.getBoundingClientRect();
    const mask = this.maskTarget;
    const maskRect = mask.getBoundingClientRect();

    const x = this.lastX - rect.left;
    const y = this.lastY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    let rotateX = ((y - centerY) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * -15;

    const maskX = this.lastX - rect.left;
    const maskY = this.lastY - rect.top;

    mask.style.setProperty('--glow-x', `${maskX}px`);
    mask.style.setProperty('--glow-y', `${maskY}px`);

    const flipRotate = this.isFlipped ? 180 : 0;

    if (this.isFlipped) {
      rotateX *= -1;
    }

    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
    card.style.setProperty('--f', `${flipRotate}deg`);
    card.style.setProperty('--s', '1.05');

    this.ticking = false;
  }

  startTracking() {
    this.cardTarget.classList.add(this.isMovingClass);
    this.cardTarget.addEventListener("mousemove", this.handleMouseMove);
  }

  stopTracking() {
    this.cardTarget.classList.remove(this.isMovingClass);
    this.cardTarget.removeEventListener("mousemove", this.handleMouseMove);

    this.cardTarget.addEventListener('transitionend', () => {
      const flipRotate = this.isFlipped ? 180 : 0;

      this.cardTarget.style.setProperty('--rx', '0deg');
      this.cardTarget.style.setProperty('--ry', '0deg');
      this.cardTarget.style.setProperty('--f', `${flipRotate}deg`);
      this.cardTarget.style.setProperty('--s', '1');

      this.maskTarget.style.setProperty('--glow-x', `50%`);
      this.maskTarget.style.setProperty('--glow-y', `50%`);
    }, { once: true });

  }

  toggleFlip() {
    this.cardTarget.classList.remove(this.isMovingClass);
    this.cardTarget.addEventListener('transitionend', () => {
      this.cardTarget.classList.add(this.isMovingClass);
    }, { once: true });

    this.isFlipped = !this.isFlipped;

    this.update();
  }
}
