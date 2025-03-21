import { BaseError } from "./baseError";
import { HttpStatusCode } from "../types/HttpStatusCode";

export class NotFound extends BaseError {
  constructor(description: string) {
    super('NOT FOUND', HttpStatusCode.NOT_FOUND, description, true);
  }
}