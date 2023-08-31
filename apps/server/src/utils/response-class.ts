import { Response } from 'express';

const HttpStatusCodes = {
	SUCCESS: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	INTERNAL_SERVER_ERROR: 500,
	CONFLICT: 409,
};

const MessageCodes = {
	LOGIN_SUCCES: 'LOGIN_SUCCES',
	LOGIN_DENIED: 'LOGIN_DENIED',
	REGISER_SUCCES: 'REGISER_SUCCES',
	REGISER_DENIED: 'REGISER_DENIED',
	USER_FOUND: 'USER_FOUND',
	USER_NOT_FOUND: 'USER_NOT_FOUND',
	USERS_NOT_FOUND: 'USERS_NOT_FOUND',
	ROLE_NOT_FOUND: 'ROLE_NOT_FOUND',
	DATA_UPDATED: 'DATA_UPDATED',
	SESSION_EXPIRED: 'SESSION_EXPIRED',
	INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
	ACCOUNT_DESACTIVATED: 'ACCOUNT_DESACTIVATED',
	SERVER_IS_ON: 'SERVER_IS_ON',
	SERVER_IS_OFF: 'SERVER_IS_OFF',
};

class ApiResponse {
	private success: boolean;
	private statusCode: number;
	private data: any;
	private error: any = null;
	private message: string | null = null;

	constructor(
		success: boolean,
		statusCode: number,
		data: any,
		error: string | null = null,
		message: string
	) {
		this.success = success;
		this.data = data;
		this.error = error;
		this.statusCode = statusCode;
		this.message = message;
	}

	private getResponseObject() {
		return {
			statusCode: this.statusCode,
			success: this.success,
			data: this.data,
			error: this.error,
			message: this.message,
		};
	}

	protected send(res: Response): void {
		res.status(this.statusCode).json(this.getResponseObject()).end();
		return;
	}

	static success(
		res: Response,
		statusCode: number,
		data: any,
		message: string
	) {
		const response = new ApiResponse(true, statusCode, data, null, message);
		response.send(res);
		return;
	}

	static error(
		res: Response,
		statusCode: number,
		message: string,
		error: any = null
	) {
		const response = new ApiResponse(false, statusCode, null, error, message);
		response.send(res);
		return;
	}
}

export { HttpStatusCodes, MessageCodes, ApiResponse };
