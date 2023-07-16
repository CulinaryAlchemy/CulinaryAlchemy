import { User } from "../../db/models";
import { UserInterface } from "../../interfaces";

export const deleteUser = async (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof id !== "string") {
        reject("invalid id format, id must be a string!");
      }

      const user: any = await User.findByPk(id);
      if (!user) {
        reject("user does not exist");
      }

      if (user.isDeleted) {
        reject("user already deleted");
      }

      user.isDeleted = true;

      await user.save();
      resolve("");
    } catch (error) {
      reject({ error });
    }
  });
};
