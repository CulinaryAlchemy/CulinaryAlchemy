import fsPromises from 'node:fs/promises';
import path from 'node:path';

export async function deleteFile(filepath: string) {
	const absoluteFilepAth = path.resolve(filepath);
	try {
		await fsPromises.unlink(absoluteFilepAth);
		console.log('File deleted');
		console.log(absoluteFilepAth);
		return Promise.resolve('');
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
}
