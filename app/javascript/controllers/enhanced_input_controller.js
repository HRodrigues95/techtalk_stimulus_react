import { Controller } from "@hotwired/stimulus"
import { ENHANCED_INPUT_VALIDATED_EVENT } from "./events"

export default class extends Controller {
  // Add a static target for the input
  static targets = ["input"]
  static values = {
    required: Boolean,
    length: Number
  }

  connect() {
    console.log("connect enhanced_input")
    console.log(this.inputTarget)

    this.isInvalid = false;
  }

  validateInput() {
    let _isInvalid = false;

    console.log('requiredValue', this.requiredValue)
    console.log('lengthValue', this.lengthValue)

    console.log("validateInput")
    console.log(this.inputTarget)
    if (this.requiredValue) {
      if (this.inputTarget.value === "") {
        _isInvalid = true;
      }
    }

    if (this.lengthValue) {
      if (this.inputTarget.value.length < this.lengthValue) {
        _isInvalid = true;
      }
    }

    if (_isInvalid) {
      this.inputTarget.classList.add("is-invalid");
    } else {
      this.inputTarget.classList.remove("is-invalid");
    }

    document.dispatchEvent(new CustomEvent(ENHANCED_INPUT_VALIDATED_EVENT, {
      detail: { isInvalid: _isInvalid }
    }));

    this.isInvalid = _isInvalid;
  }
}
