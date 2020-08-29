export abstract class DomainError extends Error
{
  abstract status: number;
  abstract message: string;

  constructor(message: string)
  {
    super(message);
  }

  abstract serializeErrors(): DomainErrorResponse;
}

export interface DomainErrorResponse
{
  status: number;
  errors: { message: string; field?: string }[];
}
