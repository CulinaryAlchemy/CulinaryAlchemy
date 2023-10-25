import Box from '@mui/joy/Box'

interface IStyles {
  position?: 'absolute' | 'relative'
}
interface IProps {
  children: React.ReactNode
  styles?: IStyles
}

export const MessageLayout: React.FC<IProps> = ({ children, styles }) => {
  return (
    <Box
      sx={{
        position: styles?.position ?? 'absolute',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%'
      }}
    >
      {children}
    </Box>
  )
}
