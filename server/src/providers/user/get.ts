import { User } from "../../db/models";
import { UserInterface } from "../../interfaces";

export const getUser = {
  ById: async (id: string) => {
    return new Promise(async (resolve, reject) => {
      if (typeof id !== "string" || id.length <= 0) {
        reject("invalid id format, id must be a string!");
      }

      try {
        const user = await User.findByPk(id);
        if (!user) {
          reject("user not found")
        }
        resolve({ user });
      } catch (error) {
        reject({ error });
      }
    });
  },
  ByEmail: async (email: string) => {
    return new Promise(async (resolve, reject) => {
      if (typeof email !== "string" || email.length <= 0) {
        reject("invalid email format, email must be a string!")
      }
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        reject("user not found");
      }
      resolve({ user });
    });
  },
  ByUsername: async (username: string) => {
    return new Promise(async (resolve, reject) => {
      if (typeof username !== "string" || username.length <= 0) {
        reject("invalid email format, email must be a string!");
      }
      try {
        const user = await User.findOne({
          where: {
            username: username,
          },
        });

        if (!user) {
          reject("user not found")
        }
        
        resolve({ user });
      } catch (error) {
        reject({ error });
      }
    });
  },
  All: async (limit: number) => {
    return new Promise(async (resolve, reject) => {
      if (typeof limit !== "number" || limit <= 0) {
        reject("invalid limit format, limit must be a number!");
      }

      try {
        const users = await User.findAll({
          limit: limit,
        });
        if (!users) {
          // response error:
        }
        resolve({ users });
      } catch (error) {
        reject({ error });
      }
    });
  },
};
