import { useAuthContext } from '@/context'
import { CStaticRoutes } from '@/routing'
import { Navigate, Outlet } from 'react-router-dom'

export const PublicGuard = () => {
  const { isAuth, isLoading } = useAuthContext()

  if (isLoading) {
    return <h1>Loading</h1>
  }

  return isAuth ? <Navigate to={CStaticRoutes.index} /> : <Outlet />
}
