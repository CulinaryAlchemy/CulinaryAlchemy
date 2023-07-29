import { useAuthContext } from '@/context'
import { CStaticRoutes } from '@/routing'
import { Navigate, Outlet } from 'react-router-dom'
export const AuthGuard = () => {
  const { isAuth, isLoading } = useAuthContext()

  if (isLoading) {
    return <h1>Loading</h1>
  }

  return isAuth ? <Outlet /> : <Navigate to={CStaticRoutes.login} />
}
