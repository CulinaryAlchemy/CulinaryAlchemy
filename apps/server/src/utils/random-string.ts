export const generateRandomString = (maxLength: number) => {
	const characteres = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'0',
	];
	const temporal: string[] = [];
	for (let i = 0; i < maxLength; i++) {
		const randomCharacterIndex = Math.floor(Math.random() * characteres.length);
		temporal.push(characteres[randomCharacterIndex]);
	}
	const finalString = temporal.join('');
	return finalString;
};
