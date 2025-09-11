import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  // Add a static target for the form
  static targets = ["form"]

  connect() {
    console.log("connect")
    console.log(this.formTarget)
    this.formTarget.classList.add("hidden")
  }

  toggleForm() {
    console.log("toggleForm")
    console.log(this.formTarget)
    if (this.formTarget) {
      this.formTarget.classList.toggle("hidden")
    }
  }
}
