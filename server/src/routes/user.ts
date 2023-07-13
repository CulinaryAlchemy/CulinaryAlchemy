import express from "express";

import { userProvider } from "../providers/users";

const userRouter = express.Router();

userRouter.get("/by-id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("Invalid id");
    }
    const users = await userProvider.getUserById(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

userRouter.get("/by-email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    if (!email) {
      throw new Error("Invalid id");
    }
    const users = await userProvider.getUserByEmail(email);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

userRouter.get("/by-username/:username", async (req, res) => {
  const { username } = req.params;
  try {
    if (!username) {
      throw new Error("Invalid id");
    }
    const users = await userProvider.getUserByUsername(username);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

userRouter.get("/all/:limit", async (req, res) => {
  const { limit } = req.params;

  try {
    const parsedLimit = parseInt(limit);
    const users = await userProvider.getAllUsers(parsedLimit);
  } catch (error) {
    res.status(400).json(error);
  }
});

userRouter.post("/create", async (req, res) => {
  const { username, email, password } = req.body;
  const user = {
    username,
    email,
    password,
  }
  try {
    const newUser = await userProvider.createUser(user);
  } catch (error) {
    res.status(400).json(error);
  }
})