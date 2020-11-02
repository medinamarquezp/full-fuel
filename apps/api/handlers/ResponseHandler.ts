import { Response } from "express";
import HttpStatusCode from "@/sharedDomain/HttpStatusCode";

export class ResponseHandler {
  static response(res: Response, data: unknown): Response {
    const statusCode = HttpStatusCode.OK;
    return res.status(statusCode).json({
      status: "OK",
      statusCode,
      data,
    });
  }
}
