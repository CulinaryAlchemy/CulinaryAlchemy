import { dbSequelize } from '../config/db';
import { UserProvider } from '../providers/user';
import { roleProvider } from '../providers/roles';

export const startDatabase = async () => {
	try {
		await dbSequelize.authenticate();
		console.log('Connection with databse has been established successfully.');

		await dbSequelize.sync();
		console.log('All models were synchronized successfully.');

		await seedDatabaseAdmins();
		console.log('Default users have been added to the database.');

		return Promise.resolve();
	} catch (error) {
		console.error('Unable to connect to the database:', error);
		return Promise.reject(typeof error === 'string' ? new Error(error) : error);
	}
};

export async function seedDatabaseAdmins() {
	try {
		// Create roles 'user' and 'admin' if they don't exist
		await roleProvider.create('user'), await roleProvider.create('admin');

		const doesOfficialUserExist = await UserProvider.getUser.ByUsername(
			'culinaryalchemy'
		);
		let officialUser = null;
		if (!doesOfficialUserExist) {
			officialUser = await UserProvider.createUser({
				username: 'culinaryalchemy',
				email: 'culinaryalchemyofficial@gmail.com',
				password: process.env.ADMIN_PASSWORD!,
				isAdmin: true,
			});
		}
		if (!doesOfficialUserExist && !officialUser) {
			throw new Error('official user not created');
		}

		const doesTestUserExist = await UserProvider.getUser.ByUsername('test123');
		let testUser = null;
		if (!doesTestUserExist) {
			testUser = await UserProvider.createUser({
				username: 'test123',
				email: 'test@gmail.com',
				password: 'password123123',
			});
		}
		if (!doesTestUserExist && !testUser) {
			throw new Error('test user not created');
		}
		Promise.resolve();
	} catch (error) {
		console.log(error);
		Promise.reject(error);
	}
}

export async function checkDatabaseHealth() {
	try {
		await dbSequelize.authenticate();
		Promise.resolve();
	} catch (error) {
		Promise.reject(new Error(error as string));
	}
}
