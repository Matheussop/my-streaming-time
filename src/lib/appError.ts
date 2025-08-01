export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: string;
  public readonly errors?: any[];

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    details?: string,
    errors?: any[],
  ) {
    super(message);

    this.name = "AppError";

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    this.errors = errors || [];

    Object.defineProperties(this, {
      name: { enumerable: true },
      message: { enumerable: true },
      statusCode: { enumerable: true },
      isOperational: { enumerable: true },
      details: { enumerable: true },
      errors: { enumerable: true },
    });

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toString(): string {
    return JSON.stringify({
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      isOperational: this.isOperational,
      details: this.details,
      errors: this.errors,
    });
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      isOperational: this.isOperational,
      details: this.details,
      errors: this.errors,
      stack: this.stack,
    };
  }

  debug() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      isOperational: this.isOperational,
      details: this.details,
      errors: this.errors ? [...this.errors] : [],
    };
  }

  static fromError(error: any): AppError {
    if (error.response) {
      const { status, data } = error.response;
      let message = data.message || "An error occurred";
      let errors = data.errors || [];
      if (status === 404) {
        message = "Not Found";
      }
      // Handle specific error types
      if (status === 400 && data.errors) {
        message = "Validation Error";
        errors = Object.values(data.errors).map((e: any) => ({
          field: e.path,
          message: e.message,
        }));
      } else if (status === 400 && data.message.includes("Invalid ID format")) {
        message = "Invalid ID format";
      } else if (
        status === 400 &&
        data.message.includes("Duplicate field value entered")
      ) {
        message = "Duplicate field value entered";
      }

      if (errors.length > 0) {
        message = errors.map((errorItem: any) => errorItem.message).join("\n");
      }
      return new AppError(message, status, true, data.details, errors);
    }

    if (error.request) {
      return new AppError(
        "Network Error: Unable to reach the server",
        0,
        false,
      );
    }

    if (error.message && error.message.includes("timeout")) {
      return new AppError(
        "Request Timeout: The server took too long to respond",
        0,
        false,
      );
    }

    return new AppError(error.message, 500, false);
  }
}
