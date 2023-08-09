import { UserProvider } from '../providers/user';
import { Role } from './models'; // Import your Role model here

export async function seedDatabaseAdmins() {
	try {
		// Create roles 'user' and 'admin' if they don't exist
		const [userRole, adminRole] = await Promise.all([
			Role.findOrCreate({ where: { name: 'user' } }),
			Role.findOrCreate({ where: { name: 'admin' } }),
		]);

		const officialUser = await UserProvider.getUser.ByUsername('culinaryalchemy')
		if (!officialUser) {
			await UserProvider.createUser({
				username: 'culinaryalchemy',
				email: 'culinaryalchemyofficial@gmail.com',
				password: process.env.ADMIN_PASSWORD!,
				isAdmin: true
			});
		}

		const testUser = await UserProvider.getUser.ByUsername('test123')
		if (!testUser) {
			await UserProvider.createUser({
				username: 'test123',
				email: 'test@gmail.com',
				password: 'password123123',
			});
		}

		Promise.resolve()
	} catch (error) {
		console.log(error);
		Promise.reject(error)
	}
}
