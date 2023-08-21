import multer from 'multer';

const storage = multer.diskStorage({});

const upload = multer({
	storage,
	fileFilter(_req, file, callback) {
		if (file.mimetype.startsWith('image')) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
});

export { upload };
