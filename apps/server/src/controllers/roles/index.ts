import { Request, Response } from 'express';
import { RoleInterface } from '../../interfaces';
import { roleProvider } from '../../providers/roles';
import { HttpStatusCodes, sendApiError, sendApiResponse } from "../../utils";

export const rolesControllers = {
    get: {
        byId: async (req: Request, res: Response) => {
            const { id } = req.params;
            try {
                const role: RoleInterface | null = await roleProvider.getById(id);
                if (!role) {
                    sendApiError(res, HttpStatusCodes.NOT_FOUND, 'role not found', null);
                }
                sendApiResponse(res, HttpStatusCodes.SUCCESS, role);
            } catch (err) {
                sendApiError(res, HttpStatusCodes.NOT_FOUND, 'role not found', null);
            }
        }
    }
}