import { Request, Response, NextFunction } from 'express';
import { isImageSizeValid, isImageWeightValid } from '../../utils';

const recipeImage = (req: Request, _res: Response, next: NextFunction) => {
	if (!req.files) {
		return next(new Error('No images provided'));
	}

	const imagesArray: any = (req as any).files[
		'images'
	] as Express.Multer.File[];

	if (imagesArray.length === 0)
		return next(new Error('No images received on the server side'));

	for (const image of imagesArray) {
		// check image size
		const maxSizeInBytes = 1000 * 200;
		const sizeIsOkay = isImageWeightValid(image.size, maxSizeInBytes);
		if (!sizeIsOkay) {
			return next(
				new Error(
					`Image size is too large. max image size: ${maxSizeInBytes} bytes. size of image received: ${image.size}`
				)
			);
		}

		const imagePath = image.path;
		const isImageSizeOkay = isImageSizeValid(imagePath, 129, 129);
		if (!isImageSizeOkay) {
			return next(
				new Error('Image size is too large, max image size: 129px x 129px')
			);
		}
	}
	next();
};
export { recipeImage };
