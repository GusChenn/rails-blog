import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "roulette",
    "icon"
  ];

  connect() {
    this.rouletteTarget.addEventListener("animationend", () => {
      this.reorderIcons();
      this.addWindUpStyle();
    });
  }

  spin() {
    this.rouletteTarget.classList.remove("vertical-roulette", "replay-roulette");
    void this.rouletteTarget.offsetWidth;
    this.rouletteTarget.classList.add("replay-roulette");
  }

  reorderIcons() {
    const icons = this.iconTargets;
    const firstIcon = icons[icons.length - 1];

    // Remove the last icon
    firstIcon.remove();

    // Insert it at the beginning of the roulette
    this.rouletteTarget.insertAdjacentElement('afterbegin', firstIcon);
  }

  addWindUpStyle() {
    this.firstIcon().classList.add("hover:translate-y-2", "cursor-pointer");
    this.firstIcon().addEventListener("click", this.spin.bind(this));
  }

  firstIcon() {
    return this.iconTargets[0];
  }
}
