import { DomainError } from "@/sharedDomain/DomainError";
import HttpStatusCode from "@/sharedDomain/HttpStatusCode";

const errorTitle = "Too Many Requests";

export class TooManyRequestsException extends DomainError
{
  timestamp = new Date();
  statusCode = HttpStatusCode.TOO_MANY_REQUESTS;
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
