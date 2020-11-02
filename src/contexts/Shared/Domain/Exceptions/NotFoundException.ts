import { DomainError } from "@/sharedDomain/DomainError";
import HttpStatusCode from "@/sharedDomain/HttpStatusCode";

const errorMessage = "Not found";

export class NotFoundException extends DomainError
{
  statusCode = HttpStatusCode.NOT_FOUND;
  message = errorMessage;
  errors = "Resource not found";

  constructor()
  {
    super(errorMessage);
  }
}
