import { DomainError } from "@/sharedDomain/DomainError";
import HttpStatusCode from "@/sharedDomain/HttpStatusCode";

const errorMessage = "The server cannot process the request due to an apparent client error";

export class ValidationException extends DomainError
{
  statusCode = HttpStatusCode.BAD_REQUEST;
  message = errorMessage;
  errors: unknown[];

  constructor(errors: unknown[])
  {
    super(errorMessage);
    this.errors = errors;
  }
}
