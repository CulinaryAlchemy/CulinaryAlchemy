import { Request, Response } from 'express';
import { RoleInterface } from '../../interfaces';
import { roleProvider } from '../../providers/roles';
import { HttpStatusCodes, ApiResponse, MessageCodes } from '../../utils';

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
						MessageCodes.ROLE_NOT_FOUND,
						null
					);
				}
				ApiResponse.success(res, HttpStatusCodes.SUCCESS, role, '');
			} catch (err) {
				ApiResponse.error(
					res,
					HttpStatusCodes.NOT_FOUND,
					MessageCodes.INTERNAL_SERVER_ERROR,
					null
				);
			}
		},
	},
};
