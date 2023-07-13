import { User } from "../db/models";
import { UserInterface } from "../interfaces";

const userProvider = {
  getUserById: async (id: string) => {
    return new Promise((resolve, reject) => {
      if (typeof id !== "string" || id.length <= 0) {
        reject({ error: "invalid id format, id must be a string!" });
      }

      try {
        const user = User.findByPk(id);
        resolve({ user });
      } catch (error) {
        reject({ error });
      }
    });
  },
  getUserByEmail: async (email: string) => {
    return new Promise((resolve, reject) => {
      if (typeof email !== "string" || email.length <= 0) {
        reject({ error: "invalid email format, email must be a string!" });
      }
      try {
        const users = User.findOne({
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
  getAllUsers: async (limit: number) => {
    return new Promise((resolve, reject) => {
      if (typeof limit !== "string" || limit <= 0) {
        reject({ error: "invalid limit format, limit must be a number!" });
      }

      try {
        const users = User.findAll({
          limit: limit,
        });
        resolve({ users });
      } catch (error) {
        reject({ error });
      }
    });
  },
  createUser: async (user: UserInterface) => {
    return new Promise((resolve, reject) => {
      try {
        const newUser = User.build({ user });
        const validationFailed = newUser.validate();
        if (!validationFailed) {
          newUser.save();
        }
        resolve({ newUser });
      } catch (error) {
        reject({ error });
      }
    });
  },
};
