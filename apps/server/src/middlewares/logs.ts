import { Request, Response, NextFunction } from 'express';

export function logsMiddw(req: Request, _res: Response, next: NextFunction) {
	console.log({
		method: req.method,
		url: req.url,
		headers: req.headers,
		query: req.query,
		body: req.body,
		params: req.params,
	});
	next();
}
