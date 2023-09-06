import { Request, Response, NextFunction } from 'express';
import { isImageSizeValid, isImageWeightValid } from '../../utils';

const profileImage = (req: Request, _res: Response, next: NextFunction) => {
	if (req.files && 'avatar' in req.files) {
		// check image size
		const avatar = req.files['avatar'][0] as Express.Multer.File;
		const maxSizeInBytes = 1000 * 200;
		const sizeIsOkay = isImageWeightValid(avatar.size, maxSizeInBytes);
		if (!sizeIsOkay) {
			return next(new Error('Image size is too large'));
		}

		const imagePath = avatar.path;
		const isImageSizeOkay = isImageSizeValid(imagePath, 129, 129);
		if (!isImageSizeOkay) {
			return next(
				new Error('Image size is too large, max image size: 129px x 129px')
			);
		}
	}
	if (req.files && 'avatarBlur' in req.files) {
		// check image size
		const avatarBlur = req.files['avatarBlur'][0] as Express.Multer.File;
		const maxSizeInBytes = 1000 * 200;
		const sizeIsOkay = isImageWeightValid(avatarBlur.size, maxSizeInBytes);
		if (!sizeIsOkay) {
			return next(new Error('Image size is too large'));
		}

		const imagePath = avatarBlur.path;
		const isImageSizeOkay = isImageSizeValid(imagePath, 20, 20);
		if (!isImageSizeOkay) {
			return next(
				new Error('Image size is too large, max image size: 20px x 20px')
			);
		}
	}
	next();
};
export { profileImage };
