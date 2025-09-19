// Custom Turbo Stream action for React refreshes
import { Turbo } from "@hotwired/turbo-rails"

Turbo.StreamActions.refresh_react = function () {
  const componentName = this.getAttribute("component")
  const eventName = this.getAttribute("event") || 'react:refresh'

  const detail = {
    component: componentName,
    target: this.target,
    timestamp: new Date().toISOString(),
  }

  const refreshEvent = new CustomEvent(eventName, {
    detail,
    bubbles: true
  })

  document.dispatchEvent(refreshEvent)
}
