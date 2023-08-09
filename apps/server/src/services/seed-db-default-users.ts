import { UserProvider } from '../providers/user';
import { Role } from '../models'; // Import your Role model here
import { roleProvider } from '../providers/roles';

export async function seedDatabaseAdmins() {
	try {
		// Create roles 'user' and 'admin' if they don't exist
		await roleProvider.create('user'),
			await roleProvider.create('admin')

		const doesOfficialUserExist = await UserProvider.getUser.ByUsername('culinaryalchemy')
		let officialUser = null
		if (!doesOfficialUserExist) {
			officialUser = await UserProvider.createUser({
				username: 'culinaryalchemy',
				email: 'culinaryalchemyofficial@gmail.com',
				password: process.env.ADMIN_PASSWORD!,
				isAdmin: true
			})
		}
		if (!doesOfficialUserExist && !officialUser) {
			throw new Error('official user not created')
		}

		const doesTestUserExist = await UserProvider.getUser.ByUsername('test123')
		let testUser = null
		if (!doesTestUserExist) {
			testUser = await UserProvider.createUser({
				username: 'test123',
				email: 'test@gmail.com',
				password: 'password123123',
			})
		}
		if (!doesTestUserExist && !testUser) {
			throw new Error('test user not created')
		}
		Promise.resolve()
	} catch (error) {
		console.log(error);
		Promise.reject(error)
	}
}
