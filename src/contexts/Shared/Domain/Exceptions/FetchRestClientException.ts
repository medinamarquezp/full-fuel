import { DomainError, DomainErrorResponse } from "@/sharedDomain/DomainError";
import HttpStatusCode from "@/sharedDomain/HttpStatusCode";

export class FetchRestClientException extends DomainError
{
  status = HttpStatusCode.INTERNAL_SERVER_ERROR;
  message: string;

  constructor(errorMessage: string)
  {
    super(errorMessage);
    this.message = errorMessage;
  }

  serializeErrors(): DomainErrorResponse
  {
    return {
      status: this.status,
      errors: [{ message: this.message }]
    };
  }
}
