import { useGlobalAuth } from '@/hooks'
import { type IUser, type IUserUpdate } from '@/models/LOGIC'
import { CFrontRoutes } from '@/routing'
import { deleteApiUser, updateApiUser } from '@/services'
import { useNavigate } from 'react-router-dom'

export const useUserMethods = () => {
  const { updateSessionData } = useGlobalAuth()
  const navigate = useNavigate()

  const updateUser = (id: number, newUserDate: IUserUpdate) => {
    return updateApiUser(id, newUserDate)
      .then((response) => {
        if (!location.pathname.includes(CFrontRoutes.Static.settings.home.absolute)) {
          navigate(CFrontRoutes.Dynamic.user(response.data.data?.username as string))
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
