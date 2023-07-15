import { UserProvider } from "../../../providers/user";
import { sendApiError, sendApiResponse } from "../../../utils/index";
import { HttpStatusCodes } from "../../../utils";

import { Request, Response } from "express";

export const getByUsername = (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    UserProvider
      .getUser.ByUsername(username)
      .then((user) =>
        user
          ? sendApiResponse(res, HttpStatusCodes.SUCCESS, user)
          : sendApiError(res, HttpStatusCodes.NOT_FOUND, "user not found", null)
      );
  } catch (error) {
    sendApiError(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, 'internal server error', null)
  }
};