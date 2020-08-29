/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>/src"],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      "tsConfigFile": "tsconfig.json"
    }
  },
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
};
