import express from "express";

// providers
import { getById, getByEmail, getByUsername, getAll } from "./get";
import { putById } from "./put";
import { deleteById } from "./delete";

// validators
import { idValidator, emailValidator } from "../../middlewares/valdiators";

export const userRouter = express.Router();

// get
userRouter.get("/id/:id", idValidator, getById);

userRouter.get("/email", emailValidator, getByEmail);

userRouter.get("/username/:username", getByUsername);

userRouter.get("/all/:limit", getAll);

// put
userRouter.put("/id/:id", idValidator, putById)

// delete 
userRouter.delete("/id/:id", idValidator, deleteById)