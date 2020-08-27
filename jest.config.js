module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "^@/(.+)$": "<rootDir>/src/$1"
  }
};
