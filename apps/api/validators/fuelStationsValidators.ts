import { body, ValidationChain } from "express-validator";

export const getListByGeoValidationRules  = (): ValidationChain[] => {
  return [
    body("longitude")
      .notEmpty()
      .withMessage("longitude parameter is required")
      .matches(/^(\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/)
      .withMessage("Wrong longitude format"),
    body("latitude")
      .notEmpty()
      .withMessage("latitude parameter is required")
      .matches(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)
      .withMessage("Wrong latitude format"),
    body("radius")
      .notEmpty()
      .withMessage("radius parameter is required")
      .isNumeric()
      .withMessage("radius must be a valid number"),
    body("onlyOpen")
      .isBoolean()
      .withMessage("onlyOpen must be boolean")
      .optional()
  ];
};

export const getListByIdsValidationRules = (): ValidationChain[] => {
  return [
    body("longitude")
      .notEmpty()
      .withMessage("longitude parameter is required")
      .matches(/^(\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/)
      .withMessage("Wrong longitude format"),
    body("latitude")
      .notEmpty()
      .withMessage("latitude parameter is required")
      .matches(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)
      .withMessage("Wrong latitude format"),
    body("fuelstationsIDs")
      .notEmpty()
      .withMessage("fuelstationsIDs parameter is required")
      .isArray()
      .withMessage("fuelstationsIDs must be an array of numbers"),
    body("fuelstationsIDs.*")
      .notEmpty()
      .withMessage("fuelstationsIDs parameter is required")
      .isNumeric()
      .withMessage("fuelstationsIDs must be an array of numbers")
  ];
};

export const getByIdValidationRules = (): ValidationChain[] => {
  return [
    body("longitude")
      .notEmpty()
      .withMessage("longitude parameter is required")
      .matches(/^(\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/)
      .withMessage("Wrong longitude format"),
    body("latitude")
      .notEmpty()
      .withMessage("latitude parameter is required")
      .matches(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)
      .withMessage("Wrong latitude format"),
    body("fuelstationID")
      .notEmpty()
      .withMessage("fuelstationID parameter is required")
      .isNumeric()
      .withMessage("fuelstationID must be a number")
  ];
};
