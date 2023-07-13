import express from "express";

import { userProvider } from "../providers/users";

export const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const user = {
    username,
    email,
    password,
  };
  try {
    const newUser = await userProvider.createUser(user);
    res.status(201).end();
  } catch (error) {
    res.status(400).json(error);
  }
});
