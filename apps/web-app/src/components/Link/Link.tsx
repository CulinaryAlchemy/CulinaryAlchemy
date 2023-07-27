import DesignLink, { type LinkProps as DesignLinkProps } from '@mui/joy/Link'
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom'


export const AppLink: React.FC<DesignLinkProps & RouterLinkProps> = ({ to, children, ...props }) => {
  return (
        <DesignLink component={RouterLink} {...props}>
            {children}
        </DesignLink>
  )
}
