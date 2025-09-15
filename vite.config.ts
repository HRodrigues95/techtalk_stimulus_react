import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import ReactPlugin from '@vitejs/plugin-react'
import StimulusHmrPlugin from 'vite-plugin-stimulus-hmr'

export default defineConfig({
  plugins: [
    RubyPlugin(),
    ReactPlugin(),
    StimulusHmrPlugin(),
  ],
})
