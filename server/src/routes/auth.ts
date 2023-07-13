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
    userProvider.createUser(user)
    .then(() => res.status(201).end())
  } catch (error) {
    res.status(400).json(error);
  }
});
