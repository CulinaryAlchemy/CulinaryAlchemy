import { body, ValidationChain } from 'express-validator';
import dns from 'dns';

export const emailValidator: ValidationChain[] = [
	body('email').notEmpty().withMessage('email is required'),
	body('email').isEmail().withMessage('email must be in an email format'),
	body('email').isLength({ min: 4, max: 254 }),
	body('email').custom(validateEmailDomain),
];

async function validateEmailDomain(email: string) {
	await new Promise((resolve, reject) => {
		if (!email) {
			return reject(new Error('invalid email'));
		}
		const [, domain] = email.split('@');
		dns.resolve(domain, (error) => {
			if (error) {
				console.log('reject');
				return reject(new Error('invalid email domain'));
			} else {
				console.log('resolve');
				return resolve(true);
			}
		});
	});
}
