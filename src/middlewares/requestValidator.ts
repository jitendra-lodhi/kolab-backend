import { NextFunction, Request, Response } from "express";
import apiHandler from "../utils/responseHandler";
import { Constants } from "../config/constants";
import logger from "../logger";

//import apiHandler from "../utils/responseHandler";

export const requestValidator = (
  schema: any,
  validationPart: "body" | "params" | "query" | "headers"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[validationPart], {
        abortEarly: false,
      });
      if (error) {
        const data: any = [];
        if (error.isJoi) {
          // Access the details of the validation error
          const details = error.details;
          // Loop through each error detail
          details.forEach((detail: any) => {
            if (detail.type === "any.required")
              data.push(
                `${detail.path} property is missing in the request body`
              );
            else
              data.push(
                `${detail.path} property is not allowed in the request body`
              );
          });
        }
        //console.log(error);
        logger.error(
          `Error while validating the request payload, ${JSON.stringify(error)}`
        );
        return apiHandler.errorHandler(
          {
            message: Constants.ErrorMessage.INVALID_REQUEST_FORMAT,
            statusCode: Constants.Http.BAD_REQUEST,
          },
          res,
          { error: data }
        );
      } else {
        next();
      }
    } catch (err) {
      return apiHandler.errorHandler(
        {
          message: Constants.ErrorMessage.INVALID_REQUEST_FORMAT,
          statusCode: Constants.Http.BAD_REQUEST,
        },
        res
      );
    }
  };
};
