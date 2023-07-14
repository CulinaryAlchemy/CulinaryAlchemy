import { Response } from 'express';
import { ApiResponse } from './index';

export function sendApiResponse(res: Response, statusCode: number, data: any): void {
  const response = ApiResponse.success(data, statusCode);
  res.status(statusCode).json(response);
}

export function sendApiError(res: Response, statusCode: number, message: string, details?: any): void {
  const response = ApiResponse.error(statusCode, message, details);
  res.status(statusCode).json(response);
}