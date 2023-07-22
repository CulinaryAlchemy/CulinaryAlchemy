import { Request, Response, NextFunction } from 'express';

export function logsMiddw(req: Request, res: Response, next: NextFunction) {
	console.log({
		method: req.method,
		url: req.url,
		headers: req.headers,
		params: req.params,
		body: req.body,
	});
	next();
}
