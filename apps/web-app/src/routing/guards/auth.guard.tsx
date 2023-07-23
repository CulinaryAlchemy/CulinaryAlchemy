import { useAuth } from '@/hooks'
import { CRoutes } from '@/routing'
import { Navigate, Outlet } from 'react-router-dom'
export const AuthGuard = () => {
  const { isAuth, isLoading } = useAuth()
  console.log('authhh')
  if (isLoading) {
    return <h1>Loading</h1>
  }

  return isAuth ? <Outlet /> : <Navigate to={CRoutes.login} />
}
