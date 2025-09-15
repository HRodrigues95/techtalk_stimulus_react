// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "./application"
// Old way
// import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"

// New way
import { registerControllers } from "stimulus-vite-helpers"

// Old way
//eagerLoadControllersFrom("controllers", application)

// New way
const controllers = import.meta.glob("./*_controller.js", { eager: true })

registerControllers(application, controllers)
