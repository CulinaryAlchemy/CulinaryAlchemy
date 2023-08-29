import { useGlobalAuth } from '@/hooks'
import { type IUser, type IUserUpdate } from '@/models/LOGIC'
import { deleteApiUser, updateApiUser } from '@/services'

export const useUserMethods = () => {
  const { updateSessionData } = useGlobalAuth()

  const updateUser = (id: number, newUserDate: IUserUpdate) => {
    updateApiUser(id, newUserDate)
      .then((response) => {
        updateSessionData(response.data.data as IUser)
      })
      .catch(() => {})
  }

  const deleteUser = (id: number) => {
    return deleteApiUser(id)
  }

  return { updateUser, deleteUser }
}
