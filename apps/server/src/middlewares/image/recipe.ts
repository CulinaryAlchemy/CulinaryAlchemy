import { Request, Response, NextFunction } from 'express';
import { isImageSizeValid, isImageWeightValid } from '../../utils';

const recipeImage = (req: Request, _res: Response, next: NextFunction) => {
	if (!req.files) {
		return next(new Error('No images provided'));
	}

	const keysinRequestFiles = Object.keys(req.files);

	for (const key of keysinRequestFiles) {
		if (key in req.files) {
			const image = (req as any).files[key][0] as Express.Multer.File;
			
			// check image weight
			let maxWeightInBytes: number;
			if (image.fieldname.endsWith('blur')) {
				maxWeightInBytes = 1000 * 20;
			} else {
				maxWeightInBytes = 1000 * 200;
			}
			const weightIsOkay = isImageWeightValid(image.size, maxWeightInBytes);
			if (!weightIsOkay) {
				return next(
					new Error(
						`Image size is too large. max image size: ${maxWeightInBytes} bytes. size of image received: ${image.size}`
					)
				);
			}

			let isImageSizeOkay: boolean = false;

			if (image.fieldname.endsWith('blur')) {
				isImageSizeOkay = isImageSizeValid(image.path, 20, 20);
			} else {
				isImageSizeOkay = isImageSizeValid(image.path, 129, 129);
			}
			if (!isImageSizeOkay) {
				return next(
					new Error('Image size is too large, max image size: 129px x 129px')
				);
			}
		}
	}
	next();
};
export { recipeImage };
