import express from 'express';
import { HttpStatusCodes, sendApiResponse } from '../../utils';
import { checkDbHealth } from '../../services/database';

export const healthRouter = express.Router();

healthRouter.get('/live', async (req, res) => {
	try {
		await checkDbHealth();
		return sendApiResponse(res, HttpStatusCodes.SUCCESS, null);
	} catch (error) {
		console.log(error);
		return sendApiResponse(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, null);
	}
});
