export interface UserInterface {
	id?: number;
	username: string;
	email: string;
	password: string;
	avatar?: string;
	name?: string;
	description?: string;
	location?: string;
	dietaryPreferences?: string[];
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
	roleId?: number | null;
}
