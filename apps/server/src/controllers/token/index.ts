import { Response, Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { Secret, verify } from 'jsonwebtoken';
import { ApiResponse, HttpStatusCodes, MessageCodes } from '../../utils';
import { getEnvironment } from '../../services';

export const Token = {
	checkToken: (req: Request, res: Response) => {
		const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
		if (!token) {
			return ApiResponse.error(
				res,
				HttpStatusCodes.BAD_REQUEST,
				'Token not found',
				null
			);
		}
		try {
			// get secret
			const { SECRET } = getEnvironment();

			// check secret
			const tokenDecoded: any = verify(token, SECRET as Secret);

			// check token expiration
			const actualTime = Date.now();
			const tokenEndDate = tokenDecoded.exp;
			if (actualTime > tokenEndDate) {
				return ApiResponse.error(
					res,
					HttpStatusCodes.UNAUTHORIZED,
					MessageCodes.SESSION_EXPIRED,
					null
				);
			}
			ApiResponse.success(res, HttpStatusCodes.SUCCESS, null, 'VALID_TOKEN');
		} catch (error) {
			ApiResponse.error(
				res,
				HttpStatusCodes.UNAUTHORIZED,
				MessageCodes.SESSION_EXPIRED
			);
		}
	},
};
