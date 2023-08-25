import { existsSync, unlink } from 'node:fs';

export async function deleteFile(filepath: string) {
	const FileExist = existsSync(filepath);
	if (FileExist) {
		console.log('filepath exists: ', filepath);
		try {
			await unlink(filepath, (err) => {
				if (err) {
					console.log(err);
				}
				console.log('deleted file in: ', filepath);
				return Promise.resolve();
			});
		} catch (error) {
			return Promise.reject(error);
		}
	} else {
		console.log('filepath doesnt exist: ', filepath);
		return Promise.reject(
			new Error('filepath doesnt exist in path: ' + filepath)
		);
	}
}
