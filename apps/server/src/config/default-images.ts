// default user profile picture and header image urls service

const defaultAvatar =
	'https://res.cloudinary.com/dy9gxuv2j/image/upload/v1692989889/default-avatar.jpg' ||
	process.env.DEFAULT_USER_AVATAR;
const avatarBlur = 'https://res.cloudinary.com/dy9gxuv2j/image/upload/v1693502571/default_blur_avatar.jpg';

const defaultHeader =
	'https://res.cloudinary.com/dy9gxuv2j/image/upload/v1692994795/default-header.jpg' ||
	process.env.DEFAULT_USER_HEADER;
const headerBlur = 'https://res.cloudinary.com/dy9gxuv2j/image/upload/v1693502583/default_blur_header.jpg';

export const defaultImages = {
	avatar: defaultAvatar,
	avatarBlur,
	header: defaultHeader,
	headerBlur,
};
