import { type CRoutes } from '@/routing'
import { Link as RouterLink } from 'react-router-dom'

interface IProps {
  children: React.ReactNode
  to: typeof CRoutes[keyof typeof CRoutes]
}

export const Link: React.FC<IProps> = ({ children, ...props }) => {
  return <RouterLink {...props} style={{ color: 'inherit' }}>{children}</RouterLink>
}
