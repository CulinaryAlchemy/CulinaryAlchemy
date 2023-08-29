import { useGlobalAuth } from '@/hooks'
import { useUserApiData } from '@/pages/User/hooks'
import { useParams } from 'react-router-dom'

export const useUser = () => {
  const { userName } = useParams()
  const { user } = useGlobalAuth()
  const { error, userData, isLoading } = useUserApiData(userName)

  const isUserProfileOwner = userName === user?.username

  return { userName, userData, isLoading, error, isUserProfileOwner }
}
