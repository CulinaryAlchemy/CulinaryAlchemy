import { User } from "../db/models";
import { UserInterface } from "../interfaces";

const userProvider = {
  getUserById: async (id: string) => {
    return new Promise(async (resolve, reject) => {
      if (typeof id !== "string" || id.length <= 0) {
        throw new Error("invalid id format, id must be a string!");
      }

      try {
        const user = await User.findByPk(id);
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
        const users = await User.findOne({
          where: {
            username: username,
          },
        });
        resolve({ users });
      } catch (error) {
        reject({ error });
      }
    });
  },
  getAllUsers: async (limit: number) => {
    return new Promise(async (resolve, reject) => {
      if (typeof limit !== "string" || limit <= 0) {
        throw new Error("invalid limit format, limit must be a number!");
      }

      try {
        const users = await User.findAll({
          limit: limit,
        });
        resolve({ users });
      } catch (error) {
        reject({ error });
      }
    });
  },
  createUser: async (user: UserInterface) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser = User.build({ user });
        const validationFailed = newUser.validate();
        if (!validationFailed) {
          await newUser.save();
        }
        resolve({ newUser });
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
        const updatedUser = await User.update(
          { newValues },
          {
            where: {
              id: id,
            },
          }
        );
        resolve({ updatedUser });
      } catch (error) {
        reject({ error });
      }
    });
  },
};
