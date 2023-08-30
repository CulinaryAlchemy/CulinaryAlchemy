import { Request, Response } from 'express';
import { RoleInterface } from '../../interfaces';
import { roleProvider } from '../../providers/roles';
import { HttpStatusCodes, ApiResponse } from '../../utils';

export const Role = {
	get: {
		byId: async (req: Request, res: Response) => {
			const { id } = req.params;
			try {
				const role: RoleInterface | null = await roleProvider.get.ById(id);
				if (!role) {
					ApiResponse.error(
						res,
						HttpStatusCodes.NOT_FOUND,
						'Role not found',
						null
					);
				}
				ApiResponse.success(res, HttpStatusCodes.SUCCESS, role, '');
			} catch (err) {
				ApiResponse.error(
					res,
					HttpStatusCodes.NOT_FOUND,
					'Internal server error while looking for the role',
					null
				);
			}
		},
	},
};
