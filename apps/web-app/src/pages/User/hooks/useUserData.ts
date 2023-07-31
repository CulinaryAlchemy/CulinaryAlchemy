import { type IApiResponse, type IUserApiResponse } from '@/models'
import { backRoutes } from '@/routing'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'

export const useUserData = () => {
  const { userName } = useParams()
  const { isLoading, data, error } = useSWR<IApiResponse<IUserApiResponse>, IApiResponse<IUserApiResponse>>(backRoutes.Dynamic.user(userName as string))

  return { userName, isLoading, data, error }
}
