import { GlobalLayout } from '@/layouts'
import { lazy } from 'react'

interface IProps {
  title: string
  showBackground: boolean
  children: React.ReactNode
}

const Background = lazy(() => import('./components/Background/Background'))

export const AuthLayout: React.FC<IProps> = ({ title, children, showBackground }) => {
  return (
        <GlobalLayout newTitle={title}>
          {showBackground && <Background />}
          {children}
        </GlobalLayout>
  )
}
