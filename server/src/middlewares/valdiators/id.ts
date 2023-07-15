import { body } from "express-validator";

export const idValidator = [
    body('id').notEmpty().withMessage('Id is required')
]