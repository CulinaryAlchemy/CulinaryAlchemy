import { type IApiResponse, type IRole, type IRoleApiResponse, type IUser, type IUserApiResponse } from '@/models/LOGIC'
import { CBackRoutes } from '@/routing'
import { type AxiosError } from 'axios'
import useSWR from 'swr'

export const useUserApiData = (
  userName: string | undefined,
  isUserProfileOwner: boolean,
  defaultUser?: IUser
) => {
  const { isLoading: isLoadingUser, data: userData, error } = useSWR<IApiResponse<IUserApiResponse>, AxiosError<IApiResponse<IUserApiResponse>>>(!isUserProfileOwner ? CBackRoutes.Dynamic.user.get(userName as string) : null)
  const { data: dataRole, isLoading: isLoadingRole } = useSWR<IApiResponse<IRoleApiResponse>, AxiosError<IApiResponse<IRoleApiResponse>>>(userData ? CBackRoutes.Dynamic.role.get(userData?.data?.roleId as number) : null)
  const defaultUserData: { data: unknown } = { data: null }

  if (userData?.data != null) {
    userData.data.role = dataRole?.data as IRole
  }

  if (isUserProfileOwner) {
    defaultUserData.data = defaultUser as IUser
  }

  const isAllLoading = isLoadingUser || isLoadingRole

  return { userName, isLoading: isAllLoading, userData: userData ?? defaultUserData, error, userRole: dataRole?.data?.name }
}
