import cloudinary from 'cloudinary';
import { deleteFile } from './files-service';
import { defaultImages } from '../config/default-images';

export const cloudinaryService = {
	uploadImage: async (
		file: Express.Multer.File,
		width?: number,
		height?: number,
		center?: boolean,
		optimize?: boolean
	) => {
		cloudinary.v2.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
			secure: true,
		});
		const transformOptions: any = [];
		if (width) {
			transformOptions[0] = { ...transformOptions[0], width: width };
		}
		if (height) {
			transformOptions[0] = { ...transformOptions[0], height: height };
		}
		if (center) {
			transformOptions[0] = {
				...transformOptions[0],
				gravity: 'center',
				crop: 'fill',
			};
		}
		if (optimize) {
			transformOptions[1] = {
				...transformOptions[1],
				quality: 'auto',
				fetch_format: 'auto',
			};
		}
		try {
			console.log([...transformOptions]);
			const result = await cloudinary.v2.uploader.upload(file.path);

			if (!result) {
				return Promise.reject(result);
			}
			
			const imageUrl = result.secure_url;
			return Promise.resolve(imageUrl);
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		} finally {
			await deleteFile(file.path);
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
