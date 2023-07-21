import { CRoutes } from '@/routing'
import { Navigate, Outlet } from 'react-router-dom'
export const AuthGuard = () => {
  const isAuth = false
  const isLoading = false

  if (!isAuth) {
    return <Navigate to={CRoutes.login} />
  }

  return isLoading ? <h1>Loading</h1> : <Outlet />
}
