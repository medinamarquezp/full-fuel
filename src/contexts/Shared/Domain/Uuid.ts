export interface Uuid
{
  generate(): string;
  isValid(uuid: string): boolean;
}
