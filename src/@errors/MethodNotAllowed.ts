import { BaseError } from "./baseError";
import { HttpStatusCode } from "../types/HttpStatusCode";

export class MethodNotAllowed extends BaseError {
  constructor(description: string) {
    super('METHOD NOT ALLOWED', HttpStatusCode.METHOD_NOT_ALLOWED, description, true);
  }
}