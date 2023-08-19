import { type IUserUpdate } from '@/models/LOGIC'
import { updateApiUser } from '@/services'

export const useUserMethods = () => {
  const updateUser = (id: number, newUserDate: IUserUpdate) => {
    void updateApiUser(id, newUserDate)
  }

  return { updateUser }
}
