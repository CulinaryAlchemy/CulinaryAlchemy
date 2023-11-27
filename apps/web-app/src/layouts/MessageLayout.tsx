import Box from '@mui/joy/Box'

interface IStyles {
  position?: 'absolute' | 'relative'
  padding?: string
}
interface IProps {
  children: React.ReactNode
  styles?: IStyles
}

export const MessageLayout: React.FC<IProps> = ({
  children,
  styles = { position: 'absolute', padding: '0' }
}) => {
  return (
    <Box
      sx={{
        position: styles.position,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
        padding: styles.padding
      }}
    >
      {children}
    </Box>
  )
}
