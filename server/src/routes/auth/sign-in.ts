import { Request, Response } from "express";

import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { UserProvider } from "../../providers/user";
import { HttpStatusCodes, sendApiError, sendApiResponse } from "../../utils";

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    sendApiError(
      res,
      HttpStatusCodes.BAD_REQUEST,
      "Email and password are required"
    );
    return;
  }
  let user: any = null
  await UserProvider.getUser
    .ByEmail(email)
    .then((userFromDb) => user = userFromDb)
    .catch((error) =>
      sendApiError(res, HttpStatusCodes.NOT_FOUND, "bad credentials")
    );

  if(!user){
    return res.end()
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    sendApiError(res, HttpStatusCodes.NOT_FOUND, "bad credentials");
    return;
  }

  const secret = process.env.JWT_SECRET || "secret";

  const token = Jwt.sign({ sub: user.id }, secret, { expiresIn: "1h" });

  sendApiResponse(res, HttpStatusCodes.SUCCESS, token);
};
