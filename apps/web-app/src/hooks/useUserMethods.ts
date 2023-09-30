import { useGlobalAuth, useRouting } from '@/hooks'
import { type IUser, type IUserUpdate } from '@/models/LOGIC'
import { CFrontRoutes } from '@/routing'
import { deleteApiUser, updateApiUser } from '@/services'

export const useUserMethods = () => {
  const { updateSessionData } = useGlobalAuth()
  const { goto } = useRouting()

  const updateUser = (id: number, newUserDate: IUserUpdate) => {
    return updateApiUser(id, newUserDate)
      .then((response) => {
        if (!location.pathname.includes(CFrontRoutes.Static.settings.home.absolute)) {
          goto(CFrontRoutes.Dynamic.user(response.data.data?.username as string))
        }

        updateSessionData(response.data.data as IUser)
      })
      .catch(() => {})
  }

  const deleteUser = (id: number) => {
    return deleteApiUser(id)
  }

  return { updateUser, deleteUser }
}
