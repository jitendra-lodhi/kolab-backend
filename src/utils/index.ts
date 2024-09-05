import path from "path";
import config from "../config";
import logger from "../logger";
class Utils {
  generateUniqueUsername(firstName: string, lastName: string): string {
    const baseUsername = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    const uniqueIdentifier = Date.now().toString();
    const uniqueUsername = `${baseUsername}.${uniqueIdentifier}`;
    return uniqueUsername;
  }
  getSwaggerOptions() {
    return {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Users Service",
          version: "1.0.0",
          description: "API documentation using Swagger",
        },
        servers: [
          {
            url: "https://dbiews80twyyo.cloudfront.net/user-service/v1",
            description: "Test Environment",
          },
          {
            url: "https://d3ermdyl7kf8ez.cloudfront.net/user-service/v1",
            description: "Dev Environment",
          },
          {
            url: "http://localhost:5002/user-service/v1",
            description: "Local Environment",
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
      apis: [path.join(__dirname, "../routes/*.{ts,js}")],
    };
  }
  listRoutes(app: any) {
    const protocol = "http";
    const domain = "localhost";
    const port = config.PORT;
    const baseUrl = `${protocol}://${domain}:${port}${config.USER_SERVICE_BASE_URL}/v1`;
    logger.info("Available Routes:");

    const extractRoutes = (stack: any, parentPath = "") => {
      stack.forEach((middleware: any) => {
        if (middleware.route) {
          // Routes registered directly on the app or router
          const methods = Object.keys(middleware.route.methods)
            .join(", ")
            .toUpperCase();
          logger.info(
            `${methods}: ${baseUrl}${parentPath}${middleware.route.path}`
          );
        } else if (middleware.name === "router" && middleware.handle.stack) {
          // Nested router
          let path = middleware.regexp.source
            .replace(/\\\//g, "/") // Replace escaped slashes
            .replace(/\\\^/, "") // Remove starting caret
            .replace(/\(\?:\(\?!\/\)\.\)\?\//g, "") // Remove regex components
            .replace(/\?$/, "") // Remove trailing question mark
            .replace(/\^\//, "/") // Remove leading caret and slash
            .replace(/\(\?\=\/\|\$\)/, "") // Remove ending regex components
            .replace(/\/\?/, ""); // Remove optional trailing slash and question mark
          extractRoutes(middleware.handle.stack, `${parentPath}${path}`);
        }
      });
    };
    extractRoutes(app._router.stack);
  }
}

const utils = new Utils();
export default utils;
