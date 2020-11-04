import { Response } from "express";
import { DomainError } from "@/sharedDomain/DomainError";

export class ErrorHandler {
  static error(res: Response, err: DomainError): Response {
    const { timestamp, statusCode, error, message, detail } = err;
    return res.status(statusCode).json({
      timestamp,
      status: "ERROR",
      statusCode,
      error,
      message,
      detail
    });
  }
}
