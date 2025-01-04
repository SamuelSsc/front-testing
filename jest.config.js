module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(module-name|other-module)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@atomic$": "<rootDir>/src/atomic",
    "^@atomic/(.*)$": "<rootDir>/src/atomic/$1",
    "^@utils$": "<rootDir>/src/utils",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
  },
};
