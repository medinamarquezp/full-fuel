import { DomainError } from "@/sharedDomain/DomainError";
import HttpStatusCode from "@/sharedDomain/HttpStatusCode";

const errorTitle = "Bad Request";
const errorMessage = "The server cannot process the request due to an apparent client error";

export class ValidationException extends DomainError
{
  timestamp = new Date();
  statusCode = HttpStatusCode.BAD_REQUEST;
  error = errorTitle;
  message = errorMessage;
  detail?: unknown;

  constructor(detail?: unknown)
  {
    super(errorMessage);
    this.detail = detail;
  }
}
