import { Role } from '../../../models/user/index';
import { RoleInterface } from '../../../interfaces';

export const roleProvider = {
	get: {
		ById: async (id: string): Promise<RoleInterface | null> => {
			try {
				const role: RoleInterface | null = await Role.findByPk(id);
				return Promise.resolve(role);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		byName: async (name: string): Promise<RoleInterface | null> => {
			try {
				const role: RoleInterface | null = await Role.findOne({
					where: { name: name },
				});
				return Promise.resolve(role);
			} catch (error) {
				return Promise.reject(error);
			}
		},
	},
	create: async (roleName: string): Promise<RoleInterface | null> => {
		try {
			const doesRoleAlreadyExist = await Role.findOne({
				where: {
					name: roleName,
				},
			});
			if (doesRoleAlreadyExist) {
				return Promise.resolve(doesRoleAlreadyExist);
			}
			const newRole = await Role.create({ name: roleName });
			return Promise.resolve(newRole);
		} catch (error) {
			return Promise.reject(error);
		}
	},
};
