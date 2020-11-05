import { DomainError } from "@/sharedDomain/DomainError";
import HttpStatusCode from "@/sharedDomain/HttpStatusCode";

const errorTitle = "Conflict";

export class ConflictException extends DomainError
{
  timestamp = new Date();
  statusCode = HttpStatusCode.CONFLICT;
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
