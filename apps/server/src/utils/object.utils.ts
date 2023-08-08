type totalParamsLength = number;

export function cleanObjectKeys(objectInput: Record<string, any>): object {
	const paramsKeys = Object.keys(objectInput);

	let cleanObject: Record<string, any> = {}
	paramsKeys.forEach((key: string) => {
		if (objectInput[key] !== undefined && objectInput[key] !== null) {
			cleanObject[key] = objectInput[key];
		}
	})

	return cleanObject;
}

export function getObjectKeys(obejctInput: Record<string, any>): number {
	return Object.keys(cleanObjectKeys(obejctInput)).length;
}