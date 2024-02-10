import { ZodError } from 'zod';

export class AppError {
  public readonly message: string | ZodError;

  public readonly statusCode: number;

  constructor(message: string | ZodError, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
