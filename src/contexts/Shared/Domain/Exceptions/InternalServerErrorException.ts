import { DomainError } from "@/sharedDomain/DomainError";
import HttpStatusCode from "@/sharedDomain/HttpStatusCode";

const errorTitle = "Internal server error";

export class InternalServerErrorException extends DomainError
{
  timestamp = new Date();
  statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
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
