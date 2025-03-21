import { BaseError } from "./baseError";
import { HttpStatusCode } from "../types/HttpStatusCode";

export class InternalServerError extends BaseError {
  constructor(description: string) {
    super('INTERNAL SERVER ERROR', HttpStatusCode.INTERNAL_SERVER_ERROR, description, true);
  }
}