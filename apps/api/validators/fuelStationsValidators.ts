import { check, ValidationChain } from "express-validator";

export const getAllByGeoValidationRules  = (): ValidationChain[] => {
  return [
    check("longitude")
      .notEmpty()
      .withMessage("longitude parameter is required")
      .matches(/^(\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/)
      .withMessage("Wrong longitude format"),
    check("latitude")
      .notEmpty()
      .withMessage("latitude parameter is required")
      .matches(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)
      .withMessage("Wrong latitude format"),
    check("radius")
      .notEmpty()
      .withMessage("radius parameter is required")
      .isNumeric()
      .withMessage("radius must be a valid number"),
    check("onlyOpen")
      .isBoolean()
      .withMessage("onlyOpen must be boolean")
      .optional()
  ];
};
