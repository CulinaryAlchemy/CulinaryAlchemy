import { userRouter } from "./index";
import { userProvider } from "../../providers/users";
import { sendApiError, sendApiResponse } from "../../utils";
import { HttpStatusCodes } from "../../utils";

userRouter.get("/id/:id", (req, res) => {
  const { id } = req.params;
  try {
    userProvider
      .getUserById(id)
      .then((users) => sendApiResponse(res, 200, users))
	  .catch(error => sendApiError(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, 'internal server error', error))
  } catch (error) {
    sendApiError(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, 'internal server error', error)
  }
});

userRouter.get("/email/:email", (req, res) => {
  const { email } = req.params;
  try {
    if (!email) {
      throw new Error("Invalid id");
    }
    userProvider
      .getUserByEmail(email)
      .then((user) => res.status(200).json(user));
  } catch (error) {
    res.status(400).json(error);
  }
});

userRouter.get("/username/:username", (req, res) => {
  const { username } = req.params;
  try {
    if (!username) {
      throw new Error("Invalid id");
    }
    userProvider
      .getUserByUsername(username)
      .then((user) => res.status(200).json(user));
  } catch (error) {
    res.status(400).json(error);
  }
});

userRouter.get("/all/:limit", (req, res) => {
  const { limit } = req.params;
  try {
    const parsedLimit = parseInt(limit);

    userProvider
      .getAllUsers(parsedLimit)
      .then((users) => res.status(200).json(users))
      .catch((error) => res.status(400).json(error));
  } catch (error) {
    res.status(400).json(error);
  }
});
