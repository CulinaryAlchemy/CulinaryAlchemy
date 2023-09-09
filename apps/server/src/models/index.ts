import { User, UserDietary } from './user';
import { Role } from './role';
import { Dietary } from './dietary';

// relationships

// users x roles
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

// users x dietaries
User.hasMany(UserDietary, { foreignKey: 'userId', as: 'userDietary' });
Dietary.belongsToMany(User, { through: UserDietary });

// users x recipes

// recipes x images

export { User, Role, Dietary, UserDietary };
