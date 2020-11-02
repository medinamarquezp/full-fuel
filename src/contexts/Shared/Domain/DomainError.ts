export abstract class DomainError extends Error
{
  abstract statusCode: number;
  abstract message: string;
  abstract errors: unknown;

  constructor(message: string)
  {
    super(message);
  }
}
