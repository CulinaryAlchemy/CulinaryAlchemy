import { body } from "express-validator";

export const emailValidator = [
  body("email").notEmpty().withMessage("email is required"),
  body("email").isEmail().withMessage('email must be in an email format'),
  body('email').isLength({min: 4, max: 254})
];
