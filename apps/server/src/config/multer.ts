import multer from 'multer';

const upload = multer({
	dest: '../temporary-images',
	fileFilter(_req, file, callback) {
		const imageFileType = file.mimetype;
		const AllowedFileTypes = [
			'image/png',
			'image/jpg',
			'image/jpeg',
			'image/webp',
		];
		if (AllowedFileTypes.includes(imageFileType)) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
});

export { upload };
