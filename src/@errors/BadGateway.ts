import { BaseError } from "./baseError";
import { HttpStatusCode } from "../types/HttpStatusCode";

export class BadGateway extends BaseError {
  constructor(description: string) {
    super('BAD GATEWAY', HttpStatusCode.BAD_GATEWAY, description, true);
  }
}