import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["card", "mask"];
  static classes = ["isMoving"];

  connect() {
    this.isFlipped = false;
    this.ticking = false;
    this.lastX = 0;
    this.lastY = 0;
    this.animatingGlow = false;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.update = this.update.bind(this);
    this.animateGlowToCenter = this.animateGlowToCenter.bind(this);
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

    const x = this.lastX - rect.left;
    const y = this.lastY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    let rotateX = ((y - centerY) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * -15;

    // Calculate glow position relative to the card container
    let maskX = this.lastX - rect.left;
    const maskY = this.lastY - rect.top;

    // Invert X position when card is flipped
    if (this.isFlipped) {
      maskX = rect.width - maskX;
    }

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

      this.animateGlowToCenter();
    }, { once: true });

  }

  animateGlowToCenter() {
    if (this.animatingGlow) return;
    
    this.animatingGlow = true;
    const rect = this.cardTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Get current glow position
    const currentGlowX = this.lastX - rect.left;
    const currentGlowY = this.lastY - rect.top;
    
    // Apply flip inversion if needed
    const startX = this.isFlipped ? rect.width - currentGlowX : currentGlowX;
    const startY = currentGlowY;
    
    const startTime = performance.now();
    const duration = 600; // 600ms animation
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (cubic-bezier equivalent)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentX = startX + (centerX - startX) * easeProgress;
      const currentY = startY + (centerY - startY) * easeProgress;
      
      this.maskTarget.style.setProperty('--glow-x', `${currentX}px`);
      this.maskTarget.style.setProperty('--glow-y', `${currentY}px`);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.animatingGlow = false;
      }
    };
    
    requestAnimationFrame(animate);
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
