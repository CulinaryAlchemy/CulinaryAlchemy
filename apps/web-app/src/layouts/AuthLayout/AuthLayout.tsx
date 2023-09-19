import { lazy } from 'react'
import { Outlet } from 'react-router-dom'

interface IProps {
  showBackground: boolean
}

const Background = lazy(() => import('./components/Background/Background'))

const AuthLayout: React.FC<IProps> = ({ showBackground }) => {
  return (
        <>
          {showBackground && <Background />}
          <Outlet />
        </>
  )
}

export default AuthLayout
