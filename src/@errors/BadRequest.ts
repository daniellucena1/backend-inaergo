import { BaseError } from "./baseError";
import { HttpStatusCode } from "../types/HttpStatusCode";

export class BadRequest extends BaseError {
  constructor(description: string) {
    super('BAD REQUEST', HttpStatusCode.BAD_REQUEST, description, true);
  }
}