import { DomainError } from "@/sharedDomain/DomainError";
import HttpStatusCode from "@/sharedDomain/HttpStatusCode";

const errorTitle = "Unauthorized";

export class UnauthorizedException extends DomainError
{
  timestamp = new Date();
  statusCode = HttpStatusCode.UNAUTHORIZED;
  error = errorTitle;
  message: string;
  detail?: unknown;

  constructor(message: string, detail?: unknown)
  {
    super(message);
    this.message = message;
    this.detail = detail;
  }
}
