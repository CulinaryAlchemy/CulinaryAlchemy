import cloudinary from 'cloudinary';
import { deleteFile } from './files-service';

export const cloudinaryService = {
	uploadImage: async (file: Express.Multer.File) => {
		cloudinary.v2.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
			secure: true,
		});
		try {
			const transformOptions = [
				{ width: 400, height: 400, crop: 'fill', gravity: 'center' },
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
};
