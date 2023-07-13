import express from "express";

import { userProvider } from "../providers/users";

const userRouter = express.Router();

userRouter.get("/by-id/:id", (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("Invalid id");
    }
    userProvider.getUserById(id)
    .then((users) => res.status(200).json(users))
  } catch (error) {
    res.status(400).json(error);
  }
});

userRouter.get("/by-email/:email", (req, res) => {
  const { email } = req.params;
  try {
    if (!email) {
      throw new Error("Invalid id");
    }
    userProvider.getUserByEmail(email)
    .then((user) => res.status(200).json(user))
  } catch (error) {
    res.status(400).json(error);
  }
});

userRouter.get("/by-username/:username", (req, res) => {
  const { username } = req.params;
  try {
    if (!username) {
      throw new Error("Invalid id");
    }
    userProvider.getUserByUsername(username)
    .then((user) => res.status(200).json(user))
  } catch (error) {
    res.status(400).json(error);
  }
});

userRouter.get("/all/:limit", (req, res) => {
  const { limit } = req.params;

  try {
    const parsedLimit = parseInt(limit);
    userProvider.getAllUsers(parsedLimit)
    .then((users) => res.status(200).json(users))
  } catch (error) {
    res.status(400).json(error);
  }
});
