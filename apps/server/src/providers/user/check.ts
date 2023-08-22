import { User } from '../../models/user';

export const checkAvaiability = {
	username: async (username: string): Promise<boolean> => {
		return await isValueAvaiable({
			value: username,
			column: 'username',
		});
	},
	email: async (email: string) => {
		return await isValueAvaiable({
			value: email,
			column: 'email',
		});
	},
};
async function isValueAvaiable({
	column,
	value,
}: {
	column: string;
	value: string;
}): Promise<boolean> {
	const whereCondition: any = {};
	whereCondition[column] = value;
	const isValueNotAvaiable = await User.findOne({
		where: {
			...whereCondition,
		},
	});
	if (isValueNotAvaiable) {
		return false;
	} else {
		return true;
	}
}
