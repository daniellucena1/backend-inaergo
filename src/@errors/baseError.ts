import { HttpStatusCode } from "../types/HttpStatusCode";

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this)
  }
}

export class Found extends BaseError {
  constructor(description: string) {
    super('FOUND', HttpStatusCode.FOUND, description, true);
  }
}

export class Created extends BaseError {
  constructor(description: string) {
    super('CREATED', HttpStatusCode.CREATED, description, true);
  }
}

export class Ok extends BaseError {
  constructor(description: string) {
    super('OK', HttpStatusCode.OK, description, true);
  }
}