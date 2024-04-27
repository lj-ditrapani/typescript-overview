import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      all: true,
      thresholds: {
        statements: 90,
        branches: 98,
        functions: 97,
        lines: 90,
      },
    },
  },
})
