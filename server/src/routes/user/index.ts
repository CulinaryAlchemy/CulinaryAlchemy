import express from "express";

import { getById, getByEmail } from "./get";

export const userRouter = express.Router();

userRouter.get("/id/:id", getById);

userRouter.get("/email/:email", getByEmail);

// userRouter.get("/username/:username", (req, res) => {
//   const { username } = req.params;
//   try {
//     if (!username) {
//       throw new Error("Invalid id");
//     }
//     userProvider
//       .getUserByUsername(username)
//       .then((user) => res.status(200).json(user));
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

// userRouter.get("/all/:limit", (req, res) => {
//   const { limit } = req.params;
//   try {
//     const parsedLimit = parseInt(limit);

//     userProvider
//       .getAllUsers(parsedLimit)
//       .then((users) => res.status(200).json(users))
//       .catch((error) => res.status(400).json(error));
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });
