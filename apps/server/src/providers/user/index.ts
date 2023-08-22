import { createUser } from './create';
import { deleteUser } from './delete';
import { updateUser } from './udpate';
import { getUser } from './get';
import { AssociateWith } from './associate';
import { checkAvaiability } from './check';
import { seed } from './seed';

export const UserProvider = {
	createUser,
	deleteUser,
	updateUser,
	getUser,
	AssociateWith,
	checkAvaiability,
	seed,
};
