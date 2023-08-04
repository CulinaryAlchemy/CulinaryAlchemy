import { cloudinary } from '../config/cloudinary';

export const cloudinaryService = {
	uploadImage: async (file: Express.Multer.File) => {
		try {
			const result = await cloudinary.v2.uploader.upload(file.path);

			const imageUrl = result.secure_url;

			return Promise.resolve(imageUrl);
		} catch (error) {
			return Promise.reject(error);
		}
	},
};
