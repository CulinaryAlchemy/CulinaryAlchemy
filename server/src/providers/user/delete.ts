import { User } from "../../db/models";

export const deleteUser = async (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
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
