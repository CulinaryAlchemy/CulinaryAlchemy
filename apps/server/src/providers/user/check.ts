import { User } from '../../models/user';

export const checkAvaiability = {
	username: async (username: string): Promise<boolean> => {
		return await isValueavailable({
			value: username,
			column: 'username',
		});
	},
	email: async (email: string) => {
		return await isValueavailable({
			value: email,
			column: 'email',
		});
	},
};
async function isValueavailable({
	column,
	value,
}: {
	column: string;
	value: string;
}): Promise<boolean> {
	const whereCondition: any = {};
	whereCondition[column] = value;
	const isValueNotavailable = await User.findOne({
		where: {
			...whereCondition,
		},
	});
	if (isValueNotavailable) {
		return false;
	} else {
		return true;
	}
}
