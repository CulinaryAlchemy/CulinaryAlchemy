import { User } from "../db/models";
import { UserInterface } from "../interfaces";

export const userProvider = {
  getUserById: async (id: string) => {
    return new Promise(async (resolve, reject) => {
      if (typeof id !== "string" || id.length <= 0) {
        throw new Error("invalid id format, id must be a string!");
      }

      try {
        const user = await User.findByPk(id);
        if(!user){
          // response error:
        }
        resolve({ user });
      } catch (error) {
        reject({ error });
      }
    });
  },
  getUserByEmail: async (email: string) => {
    return new Promise(async (resolve, reject) => {
      if (typeof email !== "string" || email.length <= 0) {
        throw new Error("invalid email format, email must be a string!");
      }
      try {
        const users = await User.findOne({
          where: {
            email: email,
          },
        });
        if(!users){
          // response error:
        }
        resolve({ users });
      } catch (error) {
        reject({ error });
      }
    });
  },
  getUserByUsername: async (username: string) => {
    return new Promise(async (resolve, reject) => {
      if (typeof username !== "string" || username.length <= 0) {
        throw new Error("invalid email format, email must be a string!");
      }
      try {
        const user = await User.findOne({
          where: {
            username: username,
          },
        });
        if(!user){
          // response error:
        }
        resolve({ user });
      } catch (error) {
        reject({ error });
      }
    });
  },
  getAllUsers: async (limit: number) => {
    return new Promise(async (resolve, reject) => {
      if (typeof limit !== "number" || limit <= 0) {
        reject("invalid limit format, limit must be a number!");
      }

      try {
        const users = await User.findAll({
          limit: limit,
        });
        if(!users){
          // response error:
        }
        resolve({ users });
      } catch (error) {
        reject({ error });
      }
    });
  },
  createUser: async ({username, email, password}:any) => {
    return new Promise(async (resolve, reject) => {
      try {
        
        const newUser = await User.build({username, email, password});

        await newUser.validate();
        
        await newUser.save();
        resolve('');
      } catch (error) {
        reject({ error });
      }
    });
  },
  updateUser: async (id: string, newValues: UserInterface) => {
    return new Promise(async (resolve, reject) => {
      if (typeof id !== "string") {
        throw new Error("invalid id format, id must be a string!");
      }
      try {
        const doesUserExist = await User.findByPk(id);
        if (!doesUserExist) {
          throw new Error("user does not exist");
        }
        await User.update(
          { newValues },
          {
            where: {
              id: id,
            },
          }
        );
        resolve('');
      } catch (error) {
        reject({ error });
      }
    });
  },
  deleteUser: async (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof id !== "string") {
          throw new Error("invalid id format, id must be a string!");
        }

        const user: any = await User.findByPk(id);
        if(!user){
          throw new Error("user does not exist");
        }

        if(user.isDeleted){
          throw new Error("user already deleted");
        }

        user.isDeleted = true;

        await user.save()
        resolve('')
      } catch (error) {
        reject({ error });
      }
    });
  },
};
