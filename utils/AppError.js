class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.operationalError = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

// Use: next( new AppError(".... error message", <error code - 404 or 500 ... >))
// Eg: next(new AppError("name is required", 404))
