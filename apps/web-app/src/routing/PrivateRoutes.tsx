import { useAuthContext } from '@/context'
import { CRoutes } from '@/routing'
import { Navigate, Outlet } from 'react-router-dom'
export const PrivateRoutes = () => {
  const { isAuth, isLoading } = useAuthContext()

  if (!isAuth) {
    return <Navigate to={CRoutes.login} />
  }

  return isLoading ? <h1>Loading</h1> : <Outlet />
}
