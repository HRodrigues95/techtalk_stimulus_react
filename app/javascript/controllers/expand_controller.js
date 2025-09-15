
import { Controller } from "@hotwired/stimulus"

const EXPAND_EVENT = "expandcontroller.expand"

export default class extends Controller {
  // Add a static target for the form
  static targets = ["content", "header"]
  static values = {
    id: String,
    context: String
  }

  connect() {
    this.isExpanded = false
    this.contentTarget.classList.add("hidden")

    document.addEventListener(EXPAND_EVENT, this.handleExpandEvent.bind(this))
  }

  expand() {
    if (this.contentTarget) {
      this.isExpanded = !this.isExpanded
      this.contentTarget.classList.toggle("hidden")
      if (this.isExpanded) {
        document.dispatchEvent(new CustomEvent(EXPAND_EVENT, { detail: { id: this.idValue, context: this.contextValue } }))
      }
    }
  }

  handleExpandEvent(event) {
    if (event.detail.id !== this.idValue && event.detail.context === this.contextValue) {
      this.contentTarget.classList.add("hidden")
      this.isExpanded = false
    }
  }
}
