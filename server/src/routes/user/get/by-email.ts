import { Request, Response } from "express";
import { userProvider } from "../../../providers/users";
import { sendApiError, sendApiResponse } from "../../../utils/index";
import { HttpStatusCodes } from "../../../utils";

export const getByEmail = (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    userProvider
      .getUserByEmail(email)
      .then((user) => user ? sendApiResponse(res, HttpStatusCodes.SUCCESS, user) : sendApiError(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, 'user not found', null ))
  } catch (error) {
    sendApiError(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, 'interal server error', error )
  }
};
