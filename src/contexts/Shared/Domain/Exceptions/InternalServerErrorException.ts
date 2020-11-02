import { DomainError } from "@/sharedDomain/DomainError";
import HttpStatusCode from "@/sharedDomain/HttpStatusCode";

const errorMessage = "Internal server error";

export class InternalServerErrorException extends DomainError
{
  statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
  message = errorMessage;
  errors: unknown;

  constructor(errors: unknown)
  {
    super(errorMessage);
    this.errors = errors;
  }
}
