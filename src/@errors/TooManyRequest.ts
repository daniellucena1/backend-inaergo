import { BaseError } from "./baseError";
import { HttpStatusCode } from "../types/HttpStatusCode";

export class TooManyRequest extends BaseError {
  constructor(description: string) {
    super('TOO MANY REQUEST', HttpStatusCode.TOO_MANY_REQUEST, description, true);
  }
}