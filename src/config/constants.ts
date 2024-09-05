export class Constants {
  static config = {
    PrefixPath: "/",
  };
  static Http = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT: 409,
    UNPROCESSABLE: 422,
  };

  static SuccessMessage = {
    SUCCESS: "success",
    OTP_SENT: "OTP sent successfully",
  };

  static ErrorMessage = {
    INVALID_TOKEN: "Invalid authorization token",
    INVALID_REFRESH_TOKEN: "Invalid refresh token",
    INTERNAL_SERVER_ERROR: "Internal server error",
    HEADER_AUTHORIZATION_NOT_passed: "Header authorization not passed",
    OTP_VERIFICATION_FAILED: "OTP verification failed",
    ALREADY_EXISTS: "User already exists with this email, please try to login",
    INVALID_OTP: "Invalid OTP entered",
    USER_NOT_FOUND: "User not found",
    INVALID_REQUEST_FORMAT: "Invalid request format",
  };

  static RoleCodes = {
    USER: "USER",
    ADMIN: "ADMIN",
    SADMIN: "SUPERADMIN",
  };

  static Policies = {
    GDPR: "gdpr",
    PRIVACY: "privacy",
  };
}
