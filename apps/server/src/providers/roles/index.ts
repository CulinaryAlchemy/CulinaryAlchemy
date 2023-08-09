import { Role } from '../../db/models';
import { RoleInterface } from '../../interfaces';

export const roleProvider = {
	getById(id: string) {
		return new Promise<RoleInterface>(async (resolve, reject) => {
			const role: RoleInterface | null = await Role.findByPk(id, {
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});
			if (!role) {
				return reject('no role finded');
			} else {
				return resolve(role);
			}
		});
	},
};
