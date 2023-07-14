export class ApiResponse {
  private success: boolean;
  private data: any;
  private error: ApiResponseError | null;

  constructor(
    success: boolean,
    data: any,
    error: ApiResponseError | null = null
  ) {
    this.success = success;
    this.data = data;
    this.error = error;
  }

  static success(data: any): ApiResponse {
    return new ApiResponse(true, data);
  }

  static error(code: number, message: string, details?: string): ApiResponse {
    const error = new ApiResponseError(code, message, details);
    return new ApiResponse(false, null, error);
  }
}

export class ApiResponseError {
  private code: number;
  private message: string;
  private details?: string;

  constructor(code: number, message: string, details?: string) {
    this.code = code;
    this.message = message;
    this.details = details;
  }
}
