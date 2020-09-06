/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({
  path: "./src/config/dev.env"
});

const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>/src"],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testRegex: "(/tests/.*.(test|spec)).ts?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
};
