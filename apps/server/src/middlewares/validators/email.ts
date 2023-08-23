import dns from 'dns';

export async function validateEmailDomain(email: string) {
	return await new Promise((resolve, reject) => {
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
