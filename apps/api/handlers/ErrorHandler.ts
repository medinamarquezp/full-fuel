import { Response } from "express";
import { DomainError } from "@/sharedDomain/DomainError";

export class ErrorHandler {
  static error(res: Response, err: DomainError): Response {
    const { statusCode, message, errors } = err;
    return res.status(statusCode).json({
      status: "ERROR",
      statusCode,
      message,
      errors
    });
  }
}
