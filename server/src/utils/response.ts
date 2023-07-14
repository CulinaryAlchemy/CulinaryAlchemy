export class ApiResponse {
  private success: boolean;
  private data: any;
  private error: ApiResponseError | null;
  private code: number;
  constructor(
    success: boolean,
    data: any,
    error: ApiResponseError | null = null,
    code: number
  ) {
    this.success = success;
    this.data = data;
    this.error = error;
    this.code = code;
  }

  static success(data: any, code:number): ApiResponse {
    return new ApiResponse(true, data, null, code);
  }

  static error(code: number, message: string, details?: string): ApiResponse {
    const error = new ApiResponseError(code, message, details);
    return new ApiResponse(false, null, error, code);
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
