import { sequelize } from '../config/db/db';
import { UserProvider } from '../providers/user';
import { roleProvider } from '../providers/user/roles';
import { getEnvironment } from '.';
import { DietaryInterface } from '../interfaces/dietary.interface';

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { DietaryProvider } from '../providers/dietary';

async function syncDb() {
	try {
		const { ENVIRONMENT } = getEnvironment();
		if (ENVIRONMENT === 'development') {
			await sequelize.sync({ force: true });
			console.log('All models were deleted and initialized again successfully');
		} else {
			await sequelize.sync();
			console.log('All models were synchronized successfully.');
		}
	} catch (error) {
		Promise.reject(error);
	}
}

async function seedAllDb() {
	try {
		await seedDbRoles();
		console.log('Default roles have been added to the database');

		await seedDbUsers();
		console.log('Default users have been added to the database');

		await seedDbDietaries();
		console.log('Default dietaries have been added to the database');

		Promise.resolve();
	} catch (error) {
		Promise.reject(error);
	}
}

async function seedDbUsers() {
	try {
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

async function seedDbRoles() {
	try {
		// check if admin and user roles exists
		const doesUserRoleExist = await roleProvider.get.byName('user');
		const doesAdminRoleExist = await roleProvider.get.byName('admin');

		if (!doesUserRoleExist) {
			await roleProvider.create('user');
		}
		if (!doesAdminRoleExist) {
			await roleProvider.create('admin');
		}

		Promise.resolve();
	} catch (error) {
		Promise.reject(error);
	}
}

async function seedDbDietaries() {
	try {
		const filePath = path.join(__dirname, '../config/db/seedData/dietary.json');
		const dietariesFile = await readFile(filePath, {
			encoding: 'utf-8',
		});

		const dietariesArray: DietaryInterface[] = JSON.parse(dietariesFile);
		for (const dietaryPreference of dietariesArray) {
			try {
				const doesDietaryExist = await DietaryProvider.get.byTitle(
					dietaryPreference.title
				);
				if (!doesDietaryExist) {
					console.log(doesDietaryExist);
					try {
						await DietaryProvider.post({ ...dietaryPreference });
					} catch (error) {
						console.log(error);
						return Promise.reject();
					}
				}
			} catch (error) {
				return;
			}
		}
		return Promise.resolve();
	} catch (error) {
		Promise.reject(error);
	}
}

export async function checkDbHealth() {
	try {
		await sequelize.authenticate();
		Promise.resolve();
	} catch (error) {
		Promise.reject(error);
	}
}

export async function startDatabase() {
	try {
		await sequelize.authenticate();
		console.log('Connection with databse has been established successfully.');

		await syncDb();
		console.log('Database has been synchronized successfully.');

		await seedAllDb();
		console.log('Databse seeded succesfully');

		return Promise.resolve();
	} catch (error) {
		console.error('Unable to start database:', error);
		return Promise.reject(error as string);
	}
}
