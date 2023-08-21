import { type IUserUpdate } from '@/models/LOGIC'
import { deleteApiUser, updateApiUser } from '@/services'

export const useUserMethods = () => {
  const updateUser = (id: number, newUserDate: IUserUpdate) => {
    void updateApiUser(id, newUserDate)
  }

  const deleteUser = (id: number) => {
    return deleteApiUser(id)
  }

  return { updateUser, deleteUser }
}
