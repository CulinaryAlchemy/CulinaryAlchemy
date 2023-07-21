import { param } from 'express-validator';

export const idValidator = [param('id').notEmpty()];
