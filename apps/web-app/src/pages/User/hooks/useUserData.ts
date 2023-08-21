import { type IApiResponse, type IRole, type IRoleApiResponse, type IUserApiResponse } from '@/models/LOGIC'
import { CBackRoutes } from '@/routing'
import { type AxiosError } from 'axios'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'

export const useUserData = () => {
  const { userName } = useParams()
  const { isLoading: isLoadingUser, data: userData, error } = useSWR<IApiResponse<IUserApiResponse>, AxiosError<IApiResponse<IUserApiResponse>>>(CBackRoutes.Dynamic.user.get(userName as string))

  const { data: dataRole, isLoading: isLoadingRole } = useSWR<IApiResponse<IRoleApiResponse>, AxiosError<IApiResponse<IRoleApiResponse>>>(userData ? CBackRoutes.Dynamic.role.get(userData?.data?.roleId as number) : null)

  if (userData?.data != null) {
    userData.data.role = dataRole?.data as IRole
  }

  const isAllLoading = isLoadingUser || isLoadingRole

  return { userName, isLoading: isAllLoading, userData, error, userRole: dataRole?.data?.name }
}
