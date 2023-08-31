import cloudinary from 'cloudinary';
import { deleteFile } from './files-service';
import { defaultImages } from '../config/default-images';

export const cloudinaryService = {
	uploadImage: async (
		file: Express.Multer.File,
		width: number,
		height: number
	) => {
		cloudinary.v2.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
			secure: true,
		});
		try {
			const transformOptions = [
				{ width: width, height: height, crop: 'fill', gravity: 'center' },
				{ quality: 'auto', fetch_format: 'auto' },
			];
			const result = await cloudinary.v2.uploader.upload(file.path, {
				transformation: [...transformOptions],
			});
			const imageUrl = result.secure_url;

			await deleteFile(file.path);
			return Promise.resolve(imageUrl);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	deleteImage: async (imageUrl: string) => {
		// we check the image is not one of the default images
		const defaultImagesArray = [defaultImages.avatar, defaultImages.header];
		if (defaultImagesArray.includes(imageUrl)) {
			console.log('the image is a default one, aborting');
			return;
		}

		// we get the image public id
		const parts: any = imageUrl.split('/'); // splits the url by '/'
		if (!parts || parts.length < 2) {
			throw new Error('Invalid image url');
		}
		const public_id = parts.pop().split('.').shift(); // saves the filename without the extension

		try {
			cloudinary.v2.config({
				cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
				api_key: process.env.CLOUDINARY_API_KEY,
				api_secret: process.env.CLOUDINARY_API_SECRET,
				secure: true,
			});
			const result = await cloudinary.v2.uploader.destroy(public_id);
			console.log('imag deleted successfully', result);
			return Promise.resolve();
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
	},
};
