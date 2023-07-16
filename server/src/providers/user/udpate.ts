import { User } from "../../db/models";

export const updateUser = async (
  id: string,
  {
    username,
    name,
    email,
    password,
    location,
    description,
  }: {
    username: string;
    name: string;
    email: string;
    password: string;
    location: string;
    description: string;
  }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user: any = await User.findByPk(id);

      if (!user) {
        reject("user not found");
      }

      if (username) {
        user.username = username;
      }

      if (name) {
        typeof name !== "string"
          ? reject("type of name must be string")
          : (user.name = name);
      }
      if (email) {
        typeof email !== "string"
          ? reject("type of email must be string")
          : (user.email = email);
      }
      if (password) {
        typeof password !== "string"
          ? reject("type of password must be string")
          : (user.password = password);
      }
      if (location) {
        typeof location !== "string"
          ? reject("type of location must be string")
          : (user.location = location);
      }
      if (description) {
        typeof description !== "string"
          ? reject("type of description must be string")
          : (user.description = description);
      }

      user.save();

      resolve("");
    } catch (error) {
      reject({ error });
    }
  });
};
