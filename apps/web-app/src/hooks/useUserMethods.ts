import { type IUserUpdate } from '@/models/LOGIC'
import { updateApiUser } from '@/services'

export const useUserMethods = () => {
  const updateUser = (id: number, newUser: IUserUpdate) => {
    console.log({ id, newUser })
    void updateApiUser(id, newUser)
  }

  return { updateUser }
}
