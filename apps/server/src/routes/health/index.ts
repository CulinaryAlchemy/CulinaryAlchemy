import express from 'express';
import { HttpStatusCodes, sendApiResponse } from '../../utils';
import { checkDatabaseHealth } from '../../services/database-starting';

export const healthRouter = express.Router();

healthRouter.get('/live', async (req, res) => {
	try {
		await checkDatabaseHealth();
		return sendApiResponse(res, HttpStatusCodes.SUCCESS, null);
	} catch (error) {
		console.log(error);
		return sendApiResponse(res, HttpStatusCodes.INTERNAL_SERVER_ERROR, null);
	}
});
