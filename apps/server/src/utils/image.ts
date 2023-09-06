import fs from 'fs';
import { imageSize } from 'image-size';
const isImageWeightValid = (imageWeight: number, maxWeight: number) => {
	if (imageWeight <= maxWeight) {
		return true;
	}
	return false;
};

const isImageSizeValid = (
	imagePath: string,
	maxWidth: number,
	maxHeight: number
) => {
	const image = fs.readFileSync(imagePath);
	const imageInfo = imageSize(image);
	if (imageInfo && imageInfo.width && imageInfo.height) {
		if (imageInfo.width <= maxWidth || imageInfo.height <= maxHeight) {
			return true;
		}
	}
	return false;
};
export { isImageWeightValid, isImageSizeValid };
