import { generateRandomString } from '../../utils/random-string';
import { UserProvider } from '.';
import { RoleType } from '../../interfaces/role/role.interface';

export const seed = async ({
	username,
	email,
	password,
	role
}: {
	username: string;
	email: string;
	password: string;
	role?: RoleType;
}): Promise<void> => {
	const [isUsernameavailable, isEmailavailable] = await Promise.all([
		UserProvider.checkAvaiability.username(username),
		UserProvider.checkAvaiability.email(email),
	]);
	if (!isEmailavailable) {
		return Promise.reject(new Error('Email is already taken'));
	}
	let finalUsername = username;
	if (!isUsernameavailable) {
		console.log(
			'username is alread taken, seeding the user with a different one'
		);
		finalUsername = await findUsernameOrDie();
		console.log('new username is: ', finalUsername);
	}
	
	async function findUsernameOrDie(): Promise<string> {
		const usernameMaxLength = 15;
		let isUsernameavailable = false;
		let randomUsername: string = 'aaaa';
		while (!isUsernameavailable) {
			randomUsername = generateRandomString(usernameMaxLength);
			const isNewUsernameavailable =
				await UserProvider.checkAvaiability.username(randomUsername);
			if (isNewUsernameavailable) {
				isUsernameavailable = true;
			}
		}
		console.log('randomusername: ', randomUsername);
		return randomUsername;
	}

	try {
		await UserProvider.createUser({
			username: finalUsername,
			email: email,
			password: password,
			role: role,
		});
		return Promise.resolve();
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};
