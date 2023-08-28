// default user profile picture and header image urls service

const defaultAvatar =
	'https://res.cloudinary.com/dy9gxuv2j/image/upload/v1692989889/default-avatar.jpg' ||
	process.env.DEFAULT_USER_AVATAR;
const defaultHeader =
	'https://res.cloudinary.com/dy9gxuv2j/image/upload/v1692994795/default-header.jpg' ||
	process.env.DEFAULT_USER_HEADER;

export const defaultImages = { avatar: defaultAvatar, header: defaultHeader };
