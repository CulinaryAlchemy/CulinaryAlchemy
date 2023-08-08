import { UserProvider } from '../providers/user';
import { Role } from './models'; // Import your Role model here

export async function seedDatabaseAdmins() {
	try {
		// Create roles 'user' and 'admin' if they don't exist
		const [userRole, adminRole] = await Promise.all([
			Role.findOrCreate({ where: { name: 'user' } }),
			Role.findOrCreate({ where: { name: 'admin' } }),
		]);

		await UserProvider.getUser
			.ByUsername('admin')
			.then(() => console.log('admin already exist'))
			.catch(async () => {
				await UserProvider.createUser({
					username: 'admin',
					email: 'admin@emai.com',
					password: 'adminadminadmin',
					isAdmin: true
				});
			});

		console.log('Test users and admins created successfully.');
	} catch (error) {
		console.error('Error seeding database:', error);
	}
}
