import { Controllers } from '../../controllers';
import express from 'express';

const tokenRouter = express.Router();

tokenRouter.get('/check', Controllers.Token.checkToken);

export { tokenRouter };
