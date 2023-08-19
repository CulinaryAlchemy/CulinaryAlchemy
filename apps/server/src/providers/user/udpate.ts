import { User, UserDietary } from '../../models/user/index';
import { DietaryProvider } from '../dietary';

export const updateUser = async (
	id: string,
	{
		username,
		name,
		avatar,
		email,
		password,
		location,
		description,
		dietary,
	}: {
		username?: string;
		name?: string;
		avatar?: string;
		email?: string;
		password?: string;
		location?: string;
		description?: string;
		dietary?: string[];
	}
) => {
	try {
		// eslint-disable-next-line prefer-const
		let user = await User.findByPk(id);

		if (!user || user.isDeleted) {
			return Promise.reject('user is already deleted or does not exist');
		}

		if (username) {
			user.username = username;
		}

		if (name) {
			user.name = name;
		}

		if (avatar) {
			user.avatar = avatar;
		}

		if (email) {
			user.email = email;
		}

		if (password) {
			user.password = password;
		}

		if (location) {
			user.location = location;
		}

		if (description) {
			user.description = description;
		}

		if (dietary) {
			// we verify all dietaries exist
			let doAllDietaryExist = true;
			for (const id of dietary) {
				try {
					const doesDietaryExist = await DietaryProvider.get.byId(parseInt(id));
					if (!doesDietaryExist) {
						doAllDietaryExist = false;
					}
				} catch (error) {
					return Promise.reject(error);
				}
			}

			// if they dont exist, we reject the promise
			if (!doAllDietaryExist) {
				return Promise.reject('dietary does not exist');
			}

			const errorsArray: Error[] = [];
			for (const stringId of dietary) {
				const id = parseInt(stringId);
				try {
					// const dietaryFromDb = await DietaryProvider.get.byId(parseInt(id));
					await UserDietary.create({
						userId: user.id,
						dietaryId: id,
					});
				} catch (error) {
					errorsArray.push(new Error(error as string));
				}
			}
			if (errorsArray.length > 0) {
				console.log(errorsArray);
				return Promise.reject('INTERNAL SERVER ERROR');
			}
		}

		await user.validate();

		await user.save();

		return Promise.resolve('');
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};
