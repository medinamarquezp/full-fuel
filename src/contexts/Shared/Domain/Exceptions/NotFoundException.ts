import { DomainError } from "@/sharedDomain/DomainError";
import HttpStatusCode from "@/sharedDomain/HttpStatusCode";

const errorTitle = "Not found";

export class NotFoundException extends DomainError
{
  timestamp = new Date();
  statusCode = HttpStatusCode.NOT_FOUND;
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
