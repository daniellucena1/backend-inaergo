import { BaseError } from "./baseError";
import { HttpStatusCode } from "../types/HttpStatusCode";

export class Forbidden extends BaseError {
  constructor(description: string) {
    super('FORBIDDEN', HttpStatusCode.FORBIDDEN, description, true);
  }
}