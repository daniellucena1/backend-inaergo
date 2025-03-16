import { BaseError } from "./baseError";
import { HttpStatusCode } from "../types/HttpStatusCode";

export class ServiceUnavailable extends BaseError {
  constructor(description: string) {
    super('SERVICE UNAVAILABLE', HttpStatusCode.SERVICE_UNAVAILABLE, description, true);
  }
}