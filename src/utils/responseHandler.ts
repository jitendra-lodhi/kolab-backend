import { Response } from "express";

import { Constants } from "../config/constants";

class ApiHandler {
  constructor() {}

  errorHandler(err: any, res: Response, data: any = {}) {
    // Error handling for Joi validation errors
    if (err && err.isJoi) {
      const body = {
        error: `${err.name ? err.name : ""}: `,
      };
      res.status(Constants.Http.BAD_REQUEST);
      if (err.details && err.details.length) {
        err.details.forEach((element: any) => {
          if (element.message) {
            body.error += element.message.replace(/"/g, "");
          }
        });
      }
      body.error = body.error.replace("ValidationError:", "").trim();
      res.json({
        message: body.error,
        data: data,
        status: Constants.Http.BAD_REQUEST,
      });
    } else {
      res.status(
        err.statusCode ? err.statusCode : Constants.Http.INTERNAL_SERVER_ERROR
      );
      res.json({
        message: err.error
          ? err.error.error && err.error.error.message
            ? err.error.error.message
            : err.error.error
          : err.message,
        data: data,
        status: err.statusCode
          ? err.statusCode
          : Constants.Http.INTERNAL_SERVER_ERROR,
      });
    }
  }

  responseHandler(
    data: any,
    message: string,
    statusCode: number,
    res: Response
  ) {
    res.status(statusCode);
    res.json({
      message: message,
      data: data,
      status: statusCode,
    });
  }
}

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const apiHandler = new ApiHandler();
export default apiHandler;
