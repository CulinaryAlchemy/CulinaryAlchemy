// models
import { User } from './user';
import { Role } from './role';
import { Dietary } from './dietary';
import { Recipe } from './recipe';
import { MealType } from './meal-type';
import { Image } from './images';
// shared models
import { UserDietary, MealTypeXRecipe, RecipeXDietary } from './shared';

// relationships -------------------------------------------------------------------------------

// users x roles
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

// users x dietaries
User.hasMany(UserDietary, { foreignKey: 'userId', as: 'userDietary' });
Dietary.belongsToMany(User, { through: UserDietary });

// recipes x images
Recipe.hasMany(Image, { foreignKey: 'owner_id', as: 'images' });

// recipes x meal types
Recipe.belongsToMany(MealType, {
	through: MealTypeXRecipe,
	foreignKey: 'recipe_id',
	otherKey: 'meal_type_id',
});
// recipe x dietary
Recipe.belongsToMany(Dietary, {
	through: RecipeXDietary,
	foreignKey: 'recipe_id',
	otherKey: 'dietary_id',
});

// users x recipes
User.hasMany(Recipe, { foreignKey: 'user_id', as: 'recipes' });

export { User, Role, Recipe, MealType, Dietary, UserDietary };
