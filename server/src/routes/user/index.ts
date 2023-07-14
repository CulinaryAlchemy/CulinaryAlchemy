import express from "express";

import { getById, getByEmail, getByUsername, getAll } from "./get";

export const userRouter = express.Router();

userRouter.get("/id/:id", getById);

userRouter.get("/email/:email", getByEmail);

userRouter.get("/username/:username", getByUsername);

userRouter.get("/all/:limit", getAll);
