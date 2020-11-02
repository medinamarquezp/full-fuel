import { Request } from "express";
import { validationResult } from "express-validator";
import { ErrorHandler } from "../handlers/ErrorHandler";
import { ResponseHandler } from "../handlers/ResponseHandler";
import { ValidationException } from "@/sharedExceptions/ValidationException";
export abstract class BaseController{
  protected static errorHandler = ErrorHandler;
  protected static responseHandler = ResponseHandler;
  protected static validationErrorHandler(req: Request): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new ValidationException(errors.array());
  }
}
