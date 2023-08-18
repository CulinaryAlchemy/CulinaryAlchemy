import { useGlobalAuth } from '@/hooks'
import { CFrontRoutes } from '@/routing'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const AuthGuard = () => {
  const { pathname } = useLocation()

  const { isAuth, isLoading } = useGlobalAuth()

  if (isLoading) {
    return <h1>Loading </h1>
  }

  if (isAuth && Object.values(CFrontRoutes.Static.auth).includes(pathname)) {
    return <Navigate to={CFrontRoutes.Static.index} />
  }

  if (isAuth) {
    return <Outlet />
  }

  if (!isAuth && Object.values(CFrontRoutes.Static.auth).includes(pathname)) {
    return <Outlet />
  }


  return <Navigate to={CFrontRoutes.Static.auth.login} />
}
