export abstract class DomainError extends Error
{
  abstract timestamp: Date;
  abstract statusCode: number;
  abstract error: string;
  abstract message: string;
  abstract detail?: unknown;

  constructor(message: string)
  {
    super(message);
  }
}
