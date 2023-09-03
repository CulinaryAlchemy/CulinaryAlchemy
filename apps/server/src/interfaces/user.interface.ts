export interface UserInterface {
	id?: number;
	username: string;
	email: string;
	password: string;
	avatar?: string;
	avatarBlur?: string;
	header?: string;
	headerBlur?: string;
	name?: string;
	description?: string;
	location?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
	roleId?: number | null;
}
