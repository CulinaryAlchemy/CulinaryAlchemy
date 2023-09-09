export function hasNoSpaces(value: string) {
	const arrayOfValue = value.split(' ');
	if (arrayOfValue.length > 1) {
		return false;
	}
	return true;
}
