class BaseError extends Error {
  constructor(name, statusCode, description) {
    super(description);

    this.name = name;
    this.statusCode = statusCode;

    Error.captureStackTrace(this);
  }
}

class EmailDuplicateError extends BaseError {
  constructor() {
    super("CONFLICT", 409, "email address already exist, try login with it.");
  }
}

class UnauthorizedError extends BaseError {
  constructor(message) {
    super("Unauthorized", 401, message);
  }
}

class EmailOrPasswordWrongError extends UnauthorizedError {
  constructor() {
    super("email or password is wrong.");
  }
}

class EmailDoesNotExistError extends UnauthorizedError {
  constructor() {
    super("email does not exist, You should first sign in with it.");
  }
}

class NotAuthorizedError extends UnauthorizedError {
  constructor() {
    super("Not Authorized");
  }
}

class ForbiddenError extends BaseError {
  constructor() {
    super("FORBIDDEN", 403, "Forbidden! This is not allowed!");
  }
}

class PostNotFoundError extends BaseError {
  constructor() {
    super("Not Found", 404, "Post Not Found!");
  }
}

class ServerError extends BaseError {
  constructor(data) {
    super("SERVER_ERROR", 500, "this is happend in server side...!");
    this.data = data;
  }
}

module.exports = {
  EmailDuplicateError,
  EmailOrPasswordWrongError,
  NotAuthorizedError,
  EmailDoesNotExistError,
  ForbiddenError,
  ServerError,
  PostNotFoundError
};
