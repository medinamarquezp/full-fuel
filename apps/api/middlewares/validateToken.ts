import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "@/sharedExceptions/UnauthorizedException";
import { ErrorHandler } from "../handlers/ErrorHandler";
const apiToken = process.env.API_TOKEN;

export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = getHeadersToken(req);
    if (token !== apiToken) throw new UnauthorizedException("Incorrect token");
    next();
  } catch (error) {
    ErrorHandler.error(res, error);
  }
};

const getHeadersToken = (req: Request) : string | undefined => {
  try {
    const { authorization } = req.headers;
    const token = (authorization) ? authorization.split(" ")[1] : undefined;
    return token;
  } catch (error) {
    throw new UnauthorizedException(`Incorrect authorization header: ${error}`);
  }
};
