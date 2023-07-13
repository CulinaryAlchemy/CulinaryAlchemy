import { authRouter } from "./index";

import { userProvider } from "../../providers/users";

authRouter.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  console.log({ username, email, password });

  const responseSucces = () => {
    res.status(201).end();
  }; // replace with real response class

  const responseError = (error: unknown) => {
    res.status(401).json(error);
  }; // replace with real response class

  try {
    userProvider
      .createUser({ username, email, password })
      .then(() => responseSucces())
      .catch((error) => responseError(error));
  } catch (error) {
    responseError(error);
  }
});
