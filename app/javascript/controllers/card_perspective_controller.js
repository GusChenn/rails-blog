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
    
    // Cache frequently accessed elements
    this.card = this.cardTarget;
    this.mask = this.maskTarget;

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
    const rect = this.card.getBoundingClientRect();
    const { width, height, left, top } = rect;
    
    // Calculate relative positions once
    const x = this.lastX - left;
    const y = this.lastY - top;
    
    const halfWidth = width * 0.5;
    const halfHeight = height * 0.5;
    
    // Calculate rotations
    let rotateX = ((y - halfHeight) / halfHeight) * 15;
    const rotateY = ((x - halfWidth) / halfWidth) * -15;
    
    // Calculate glow position with flip correction
    const maskX = this.isFlipped ? width - x : x;
    
    // Batch DOM updates
    const cardStyle = this.card.style;
    const maskStyle = this.mask.style;
    
    // Apply flip correction to rotateX
    if (this.isFlipped) {
      rotateX *= -1;
    }
    
    // Set glow position
    maskStyle.setProperty('--glow-x', `${maskX}px`);
    maskStyle.setProperty('--glow-y', `${y}px`);
    
    // Set card transforms
    const flipRotate = this.isFlipped ? 180 : 0;
    cardStyle.setProperty('--rx', `${rotateX}deg`);
    cardStyle.setProperty('--ry', `${rotateY}deg`);
    cardStyle.setProperty('--f', `${flipRotate}deg`);
    cardStyle.setProperty('--s', '1.05');
    
    this.ticking = false;
  }

  startTracking() {
    this.card.classList.add(this.isMovingClass);
    this.card.addEventListener("mousemove", this.handleMouseMove);
  }

  stopTracking() {
    this.card.classList.remove(this.isMovingClass);
    this.card.removeEventListener("mousemove", this.handleMouseMove);

    this.card.addEventListener('transitionend', () => {
      const flipRotate = this.isFlipped ? 180 : 0;
      const cardStyle = this.card.style;

      cardStyle.setProperty('--rx', '0deg');
      cardStyle.setProperty('--ry', '0deg');
      cardStyle.setProperty('--f', `${flipRotate}deg`);
      cardStyle.setProperty('--s', '1');

      this.animateGlowToCenter();
    }, { once: true });
  }

  animateGlowToCenter() {
    if (this.animatingGlow) return;
    
    this.animatingGlow = true;
    const rect = this.card.getBoundingClientRect();
    const { width, height, left, top } = rect;
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    
    // Get current glow position
    const currentGlowX = this.lastX - left;
    const currentGlowY = this.lastY - top;
    
    // Apply flip inversion if needed
    const startX = this.isFlipped ? width - currentGlowX : currentGlowX;
    const startY = currentGlowY;
    
    const startTime = performance.now();
    const duration = 600;
    const maskStyle = this.mask.style;
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use more efficient easing (avoid Math.pow)
      const t = 1 - progress;
      const easeProgress = 1 - t * t * t;
      
      const currentX = startX + (centerX - startX) * easeProgress;
      const currentY = startY + (centerY - startY) * easeProgress;
      
      maskStyle.setProperty('--glow-x', `${currentX}px`);
      maskStyle.setProperty('--glow-y', `${currentY}px`);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.animatingGlow = false;
      }
    };
    
    requestAnimationFrame(animate);
  }

  toggleFlip() {
    this.card.classList.remove(this.isMovingClass);
    this.card.addEventListener('transitionend', () => {
      this.card.classList.add(this.isMovingClass);
    }, { once: true });

    this.isFlipped = !this.isFlipped;
    this.update();
  }
}
