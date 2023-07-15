import { Request, Response } from "express";
import { UserProvider } from "../../providers/user";
import { HttpStatusCodes, sendApiError, sendApiResponse } from "../../utils";

export const register = (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  console.log({ username, email, password });

  try {
    UserProvider.createUser({ username, email, password })
      .then(() => sendApiResponse(res, HttpStatusCodes.CREATED, null))
      .catch((error) =>
        sendApiError(
          res,
          HttpStatusCodes.INTERNAL_SERVER_ERROR,
          "internal server error",
          error
        )
      );
  } catch (error) {
    sendApiError(
      res,
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "internal server error"
    );
  }
};
