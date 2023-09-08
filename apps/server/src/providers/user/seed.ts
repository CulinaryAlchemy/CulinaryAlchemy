import { generateRandomString } from '../../utils/random-string';
import { UserProvider } from '.';
import { RoleType } from '../../interfaces/role/role.interface';

export const seed = async ({
	username,
	email,
	password,
	role,
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
		finalUsername = await findUsernameOrDie();
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
