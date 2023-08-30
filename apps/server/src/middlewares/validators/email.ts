import dns from 'dns';

export async function validateEmail(email: string) {
	return await new Promise((resolve, reject) => {
		if (!email) {
			return reject(new Error('invalid email'));
		}

		const [local, domain] = email.split('@');
		if (local.length > 64 || domain.length > 255) {
			return reject(
				new Error(
					'email local must be less than 64 characters and domain must be less than 255 characters'
				)
			);
		}

		dns.resolve(domain, (error) => {
			if (error) {
				return reject(new Error('invalid email domain: ' + domain));
			} else {
				return resolve(true);
			}
		});
	});
}
64;
