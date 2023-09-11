import { Request, Response, NextFunction } from 'express';
import { isImageSizeValid, isImageWeightValid } from '../../utils';

const headerImage = (req: Request, _res: Response, next: NextFunction) => {
	if (req.files && 'header' in req.files) {
		// check image size
		const header = req.files['header'][0] as Express.Multer.File;
		const maxSizeInBytes = 1000 * 200;
		const sizeIsOkay = isImageWeightValid(header.size, maxSizeInBytes);
		if (!sizeIsOkay) {
			return next(new Error('Image size is too large'));
		}

		const imagePath = header.path;
		const isImageSizeOkay = isImageSizeValid(imagePath, 1600, 1024);
		if (!isImageSizeOkay) {
			return next(
				new Error('Image size is too large, max image size: 1600px x 1024px')
			);
		}
	}
	if (req.files && 'headerBlur' in req.files) {
		// check image size
		const headerBlur = req.files['headerBlur'][0] as Express.Multer.File;
		const maxSizeInBytes = 1000 * 200;
		const sizeIsOkay = isImageWeightValid(headerBlur.size, maxSizeInBytes);
		if (!sizeIsOkay) {
			return next(new Error('Image size is too large'));
		}

		const imagePath = headerBlur.path;
		const isImageSizeOkay = isImageSizeValid(imagePath, 20, 20);
		if (!isImageSizeOkay) {
			return next(
				new Error('Image size is too large, max image size: 20px x 20px')
			);
		}
	}
	next();
};

export { headerImage };
