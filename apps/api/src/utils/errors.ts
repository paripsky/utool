export class HttpError extends Error {
  constructor(
    public message: string = 'Something went wrong...',
    public statusCode: number = 500
  ) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized request') {
    super(message, 401);
  }
}

export class AuthenticationFailedError extends UnauthorizedError {
  constructor(message = 'Authentication failed') {
    super(message);
  }
}

export class UserNotActivatedError extends UnauthorizedError {
  constructor(message = 'User not activated, please verify your email') {
    super(message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not found') {
    super(message, 404);
  }
}

export default {
  HttpError,
  UnauthorizedError,
  AuthenticationFailedError,
  NotFoundError,
};
