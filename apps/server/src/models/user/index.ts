import { User } from '..';
import { Role } from '..';
import { Dietary } from '..';
import { UserDietary } from './user.dietary';

// relationships
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
User.hasMany(UserDietary, { foreignKey: 'userId', as: 'userDietary' });
Dietary.belongsToMany(User, { through: UserDietary });

export { User, Role, Dietary, UserDietary };
