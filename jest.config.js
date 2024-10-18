module.exports = {
  verbose: false,
  preset: "ts-jest",
  testEnvironment: "node",
  
  // Use our test reporter
  reporters: [["jest-reporter", {}]],
  
  // Need this to avoid "Unable to find the root of the project"
  // See https://github.com/kulshekhar/ts-jest/issues/823
  globals: {
    "ts-jest": {
      packageJson: "<rootDir>/package.json",
    },
  },
};