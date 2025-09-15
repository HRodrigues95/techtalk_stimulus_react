// Custom Turbo Stream action for React refreshes
import { Turbo } from "@hotwired/turbo-rails"

Turbo.StreamActions.refresh_react = function () {
  const componentName = this.getAttribute("component")
  const eventName = this.getAttribute("event") || 'react:refresh'

  const refreshEvent = new CustomEvent(eventName, {
    detail: {
      component: componentName,
      target: this.target,
      timestamp: new Date().toISOString()
    },
    bubbles: true
  })

  document.dispatchEvent(refreshEvent)
}
