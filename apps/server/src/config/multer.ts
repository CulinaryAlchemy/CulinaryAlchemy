import multer from 'multer';

const upload = multer({
	dest: '../temporary-images',
	fileFilter(_req, file, callback) {
		const imageFileType = file.mimetype;

		const allowedFileTypes = ['image/webp'];
		const maxFileSize: number =
			(process.env.FILE_SIZE as unknown as number) || 5000; // we get the env or assing 5000
		if (allowedFileTypes.includes(imageFileType) && file.size <= maxFileSize) {
			return callback(null, true);
		}
		callback(null, false);
	},
});

export { upload };
