import { UserProvider } from '../providers/user';
import { roleProvider } from '../providers/roles';
import { getEnvironment } from '.';

import { sequelize } from '../database/database.config';

// import { readFile } from 'node:fs/promises';
// import path from 'node:path';
import dietaryArray from '../database/seed-data/dietary.json';
import { DietaryProvider } from '../providers/dietary';
import { TransactionOptions } from 'sequelize';

const DatabaseService = {
	seed: {
		all: async () => {
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
		},
	},
	health: {
		check: async () => {
			try {
				await sequelize.authenticate();
				Promise.resolve();
			} catch (error) {
				Promise.reject(error);
			}
		},
	},
	sync: async (force: boolean = false) => {
		try {
			const { ENVIRONMENT } = getEnvironment();
			if (ENVIRONMENT === 'development') {
				force = true;
			}
			await sequelize.sync({ force });
			Promise.resolve();
		} catch (error) {
			Promise.reject(error);
		}
	},
	start: async () => {
		try {
			await DatabaseService.health.check();
			console.log('Connection with databse has been established successfully.');

			await DatabaseService.sync();
			console.log('Database has been synchronized successfully.');

			await DatabaseService.seed.all();
			console.log('Databse seeded succesfully');

			return Promise.resolve();
		} catch (error) {
			console.error('Unable to start database:', error);
			return Promise.reject(error as string);
		}
	},
	getTransaction: async (options?: TransactionOptions) => {
		return Promise.resolve(await sequelize.transaction(options));
	},
};

async function seedDbUsers() {
	try {
		const doesOfficialUserExist = await UserProvider.getUser.byUsername(
			'culinaryalchemy'
		);
		let officialUser = null;
		if (!doesOfficialUserExist) {
			officialUser = await UserProvider.createUser({
				username: 'culinaryalchemy',
				email: 'culinaryalchemyofficial@gmail.com',
				password: process.env.ADMIN_PASSWORD!,
				role: 'admin',
			});
		}
		if (!doesOfficialUserExist && !officialUser) {
			throw new Error('official user not created');
		}

		const doesTestUserExist = await UserProvider.getUser.byUsername('test123');
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
		for (const dietaryPreference of dietaryArray) {
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

export { sequelize, DatabaseService };
