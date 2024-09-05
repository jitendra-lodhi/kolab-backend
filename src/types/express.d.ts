import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    JwtPayload: JwtPayload;
  }
}
