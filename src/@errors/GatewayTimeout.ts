import { BaseError } from "./baseError";
import { HttpStatusCode } from "../types/HttpStatusCode";

export class GatewayTimeout extends BaseError {
  constructor(description: string) {
    super('GATEWAY TIMEOUT', HttpStatusCode.GATEWAY_TIMEOUT, description, true);
  }
}