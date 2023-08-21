import { useRouting } from '@/hooks'
import { lazy } from 'react'

const ArrowBackIcon = lazy(() => import('@mui/icons-material/ArrowBack'))
const Typography = lazy(() => import('@mui/joy/Typography'))
const IconButton = lazy(() => import('@mui/joy/IconButton'))
const Stack = lazy(() => import('@mui/joy/Stack'))

interface IProps {
  title?: string | React.ReactNode
  showBackNavigation?: boolean
  description: string | React.ReactNode
}

export const TabPanelHeader: React.FC<IProps> = ({ title, description, showBackNavigation }) => {
  const { backToLastPage } = useRouting()

  const handleOnClick = () => {
    backToLastPage()
  }

  return (
    (title ?? showBackNavigation ?? description) &&
        <header>
            <Stack sx={{ padding: '1em' }}>
                <Stack direction='row' alignItems='center' spacing={0.5}>
                    {
                        showBackNavigation &&
                        <IconButton sx={{ borderRadius: '100%' }} onClick={handleOnClick} variant='plain' color='neutral'>
                            <ArrowBackIcon sx={{ fontSize: '1.45em' }} />
                        </IconButton>
                    }
                    <Stack>
                        {
                            title &&
                            <Typography level="h4" sx={{ fontWeight: 'bold' }}>{title}</Typography>
                        }
                        {
                            description &&
                            <Typography level='body3'>
                                {description}
                            </Typography>
                        }
                    </Stack>
                </Stack>
            </Stack>
        </header>
  )
}
