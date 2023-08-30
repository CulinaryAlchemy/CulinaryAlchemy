export interface UserInterface {
	id?: number;
	username: string;
	email: string;
	password: string;
	avatar?: string;
	header?: string;
	name?: string;
	description?: string;
	location?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
	roleId?: number | null;
}
