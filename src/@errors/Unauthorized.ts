import { BaseError } from "./baseError";
import { HttpStatusCode } from "../types/HttpStatusCode";

export class Unauthorized extends BaseError {
  constructor(description: string) {
    super('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED, description, true);
  }
}