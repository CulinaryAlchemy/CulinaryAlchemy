import { useGlobalAuth } from '@/hooks'
import { useUserApiData } from '@/pages/User/hooks'
import { useParams } from 'react-router-dom'

export const useUser = () => {
  const { userName } = useParams()
  const { user } = useGlobalAuth() // esta variable se actualiza bien

  const isUserProfileOwner = userName === user?.username

  const { error, userData, isLoading } = useUserApiData(
    userName,
    isUserProfileOwner,
    user
  )

  return {
    userName,
    userData,
    isLoading,
    error,
    isUserProfileOwner
  }
}
