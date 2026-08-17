import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        explore: resolve(__dirname, 'explore.html'),
        blog: resolve(__dirname, 'blog.html'),
        lightWorld: resolve(__dirname, 'light-world.html'),
        notesOverview: resolve(__dirname, 'ip-design-notes.html'),
        worldview: resolve(__dirname, 'xixi-worldview.html'),
        resume: resolve(__dirname, 'resume.html'),
        noteContext: resolve(__dirname, 'notes/executable-context-for-enterprise-agents.html'),
        noteHarness: resolve(__dirname, 'notes/agent-harness-engineering-map.html'),
        noteDeepSeekHarness: resolve(__dirname, 'notes/deepseek-harness-session-event-architecture.html'),
        noteAgentVisibility: resolve(__dirname, 'notes/agent-process-visibility-product-judgment.html'),
      },
    },
  },
})
