import { rateLimit } from 'express-rate-limit';

export const rateLimitConfig = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 100,
	standardHeaders: false,
	legacyHeaders: false,
});
