import { useAuth } from '@/hooks'
import { CRoutes } from '@/routing'
import { Navigate, Outlet } from 'react-router-dom'

export const PublicGuard = () => {
  const { isAuth, isLoading } = useAuth()

  if (isLoading) {
    return <h1>Loading</h1>
  }

  return isAuth ? <Navigate to={CRoutes.index} /> : <Outlet />
}
