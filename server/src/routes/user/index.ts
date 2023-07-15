import express from "express";

import { getById, getByEmail, getByUsername, getAll } from "./get";
import { putById } from "./put";
import { deleteById } from "./delete";
export const userRouter = express.Router();

// get
userRouter.get("/id/:id", getById);

userRouter.get("/email", getByEmail);

userRouter.get("/username/:username", getByUsername);

userRouter.get("/all/:limit", getAll);

// put
userRouter.put("/id/:id", putById)

// delete 
userRouter.delete("/id/:id", deleteById)