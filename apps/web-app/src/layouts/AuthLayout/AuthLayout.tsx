import { Header } from '@/components'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import { lazy } from 'react'
import { Outlet } from 'react-router-dom'

interface IProps {
  showBackground: boolean
}

const Background = lazy(() => import('./components/Background/Background'))

const AuthLayout: React.FC<IProps> = ({ showBackground }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        overflow: 'hidden',
        gridTemplateColumns: {
          md: '1.03fr 1fr',
          sx: '1fr'
        },
        height: '100vh'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Header />
        <Box
          sx={{
            flexGrow: 1
          }}
        >
          <Outlet />
        </Box>
        <Typography
          sx={{
            color: 'var(--joy-palette-text-tertiary, var(--joy-palette-neutral-500, #73738C))',
            lineHeight: 'var(--joy-lineHeight-md, 1.5)',
            fontSize: 'var(--Typography-fontSize, var(--joy-fontSize-xs, 0.75rem))',
            fontWeight: 600,
            alignSelf: 'center',
            marginBottom: '1em'
          }}
        >@ CulinaryAlchemy 2023</Typography>
      </Box>
      {showBackground && <Background />}
    </Box>
  )
}

export default AuthLayout
