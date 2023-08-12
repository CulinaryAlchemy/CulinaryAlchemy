export class ApiResponse {
	private success: boolean;
	private statusCode: number;
	private data: any;
	private error: ApiResponseError | null;

	constructor(
		success: boolean,
		statusCode: number,
		data: any,
		error: ApiResponseError | null = null
	) {
		this.success = success;
		this.data = data;
		this.error = error;
		this.statusCode = statusCode;
	}

	static success(data: any, code: number): ApiResponse {
		return new ApiResponse(true, code, data, null);
	}

	static error(
		statusCode: number,
		message?: string,
		details?: any,
		invalidAreas: any[] | null = null
	): ApiResponse {
		const error = new ApiResponseError(statusCode, message, details, invalidAreas);
		return new ApiResponse(false, statusCode, null, error);
	}
}

export class ApiResponseError {
	private statusCode: number;
	private message?: string;
	private details?: any;
	private invalidAreas?: any[] | null;

	constructor(statusCode: number, message?: string, details?: any, invalidAreas: any[] | null = null) {
		this.statusCode = statusCode;
		this.message = message;
		this.details = details;
		this.invalidAreas = invalidAreas;
	}
}
