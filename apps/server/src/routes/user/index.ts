import express from "express";
import passport from "../../services/auth";
import { body } from "express-validator";
// providers
import { getById, getByEmail, getByUsername, getAll } from "./get";
import { putById } from "./put";
import { deleteById } from "./delete";

// validators
import { idValidator, emailValidator } from "../../middlewares/validators";

export const userRouter = express.Router();

const passportMiddleware = passport.authenticate("jwt", { session: false });

// get
userRouter.get("/id/:id", idValidator, getById);

userRouter.get("/username/:username", getByUsername);

userRouter.get("/all/:limit", getAll);

// put
userRouter.put("/id/:id", passportMiddleware , idValidator, putById);

// delete
userRouter.delete("/id/:id", passportMiddleware, idValidator, deleteById);
