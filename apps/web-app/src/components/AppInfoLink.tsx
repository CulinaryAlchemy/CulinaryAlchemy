import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { Link } from 'react-router-dom'

interface IProps {
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  to: string
  startIcon?: React.ReactNode
}

export const AppInfoLink: React.FC<IProps> = ({ title, description, to, startIcon }) => {
  return (
        <Stack component={Link} to={to} sx={{ width: '100%', textDecoration: 'none', color: 'inherit', paddingX: '0.5em' }} direction='row' alignItems='center' spacing='1em'>
            {startIcon}
            <Stack sx={{ flexGrow: 1 }}>
                <Typography level='body2' sx={{ textWrap: 'balance', color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))' }}>{title}</Typography>
                <Typography level='body3'>{description}</Typography>
            </Stack>
            <NavigateNextIcon sx={{ fontSize: '1.6em' }} />
        </Stack>
  )
}
