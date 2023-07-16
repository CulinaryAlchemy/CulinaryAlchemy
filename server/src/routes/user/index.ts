import express from "express";
import passport from "passport";

// providers
import { getById, getByEmail, getByUsername, getAll } from "./get";
import { putById } from "./put";
import { deleteById } from "./delete";

// validators
import { idValidator, emailValidator } from "../../middlewares/valdiators";

export const userRouter = express.Router();

const passportMiddleware =  passport.authenticate('jwt', { session: false })

// get
userRouter.get("/id", idValidator, getById);

userRouter.get("/email", emailValidator, getByEmail);

userRouter.get("/username/:username", getByUsername);

userRouter.get("/all/:limit", getAll);

// put
userRouter.put("/id", passportMiddleware, idValidator, putById)

// delete 
userRouter.delete("/id", passportMiddleware, idValidator, deleteById)