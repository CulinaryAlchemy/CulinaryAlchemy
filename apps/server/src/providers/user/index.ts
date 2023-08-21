import { createUser } from './create';
import { deleteUser } from './delete';
import { updateUser } from './udpate';
import { getUser } from './get';
import { AssociateWith } from './associate';

export const UserProvider = {
	createUser,
	deleteUser,
	updateUser,
	getUser,
	AssociateWith,
};
