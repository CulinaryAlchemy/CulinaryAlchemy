import multer from 'multer';

const upload = multer({
	dest: '../temporary-images',
	fileFilter(_req, file, callback) {
		const imageFileType = file.mimetype;
		const allowedFileTypes = ['image/webp'];
		const kilobyte = 1000;
		const maxFileSize: number = kilobyte * 200; // max image size is 200 kb
		if (allowedFileTypes.includes(imageFileType) && file.size <= maxFileSize) {
			return callback(null, true);
		}
		callback(null, false);
	},
});

export { upload };
