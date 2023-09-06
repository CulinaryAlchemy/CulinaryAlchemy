import multer from 'multer';
const upload = multer({
	dest: '../temporary-images',
	fileFilter(_req, file, callback) {
		const imageFileType = file.mimetype;
		const allowedFileTypes = ['image/webp'];

		if (allowedFileTypes.includes(imageFileType)) {
			return callback(null, true);
		}
		callback(null, false);
	},
});

export { upload };
