module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 88,
      functions: 68,
      lines: 85,
      statements: 85,
    },
  },
}
