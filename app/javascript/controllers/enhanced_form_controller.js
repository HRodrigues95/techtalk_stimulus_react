import { Controller } from "@hotwired/stimulus"
import { ENHANCED_INPUT_VALIDATED_EVENT } from "./events"

export default class extends Controller {
  // Add a static target for the form
  static targets = ["form", 'submit']

  connect() {
    console.log("connect")
    console.log(this.formTarget)
    console.log(this.submitTarget)

    document.addEventListener(ENHANCED_INPUT_VALIDATED_EVENT, this.handleEnhancedInputValidatedEvent.bind(this))
  }

  handleEnhancedInputValidatedEvent(event) {
    console.log("handleEnhancedFormValidatedEvent")
    console.log(event)
    if (event.detail.isInvalid) {
      this.submitTarget.disabled = true
    } else {
      this.submitTarget.disabled = false
    }
  }
}
