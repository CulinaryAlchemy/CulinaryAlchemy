import { body, ValidationChain } from 'express-validator';
import dns from 'dns';

export const emailValidator: ValidationChain[] = [
	body('email').notEmpty().withMessage('email is required'),
	body('email').isEmail().withMessage('email must be in an email format'),
	body('email').isLength({ min: 4, max: 254 }),
	body('email').custom(validateEmailDomain),
];

function validateEmailDomain(email: string) {
	const [, domain] = email.split('@');

	return new Promise((resolve, reject) => {
		dns.resolve(domain, (error) => {
			if (error) {
				return reject(new Error('invalid email domain'));
			} else {
				return resolve(true);
			}
		});
	});
}
