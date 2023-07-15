import { UserProvider } from "../../../providers/user";
import { sendApiError, sendApiResponse } from "../../../utils/index";
import { HttpStatusCodes } from "../../../utils";

import { Request, Response } from "express";

export const putById = async (req: Request, res: Response, newValues: any) => {
    const { id } = req.params;

    try{
        UserProvider.updateUser(id, newValues)
        .then(() => sendApiResponse(res, HttpStatusCodes.CREATED, null))
        .catch(error => sendApiError(res, HttpStatusCodes.NOT_FOUND, 'user not found', null))
    } catch(error){
        sendApiError(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, 'internal server error', null)
    }

}