import { User } from "../../db/models";
import { UserInterface } from "../../interfaces";

export const createUser = async ({ username, email, password }: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newUser = await User.build({ username, email, password });

      await newUser.validate();

      await newUser.save();
      resolve("");
    } catch (error) {
      reject({ error });
    }
  });
};
