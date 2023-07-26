import { body, ValidationChain } from 'express-validator';
import dns from 'dns';

export const emailValidator: ValidationChain[] = [
	body('email')
		.notEmpty()
		.isEmail()
		.custom(validateEmailDomain),
];

async function validateEmailDomain(email: string) {
	await new Promise((resolve, reject) => {
		if (!email) {
			return reject(new Error('invalid email'));
		}
		const [, domain] = email.split('@');
		dns.resolve(domain, (error) => {
			if (error) {
				return reject(new Error('invalid email domain'));
			} else {
				return resolve(true);
			}
		});
	});
}
