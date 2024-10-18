# TypeScript + Jest PCC Environment

This document describes configuration and usage for the TypeScript + Jest environment in Project Code Challenges (PCC).

The TS language version is 3.8 and test framework is Jest. The CodeRunner uses Jest’s default `testRegex` so test files can also be in `src/`.

An example project structure is:

```
├─ src
│  └─ example.ts
└─ __tests__
   └─ example_test.ts
```

The test path uses Jest's default `testRegex`: 

    (/__tests__/.*|(\\.|/)(test|spec)).[jt]sx?$

A custom `jest.config.js` can be given as long as it sets required options. See below for default `jest.config.js`:

```
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
```

A custom `tsconfig.json` can be given to configure TypeScript compiler options.