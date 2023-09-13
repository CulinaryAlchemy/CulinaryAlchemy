import Sheet from '@mui/joy/Sheet'

interface IStyles {
  maxWidth?: string
}

interface IProps {
  children: React.ReactNode
  styles?: IStyles
}

export const DefaultLayout: React.FC<IProps> = ({ children, styles }) => {
  return (
        <Sheet
            variant='outlined'
            sx={{
              backgroundColor: 'var(--joy-palette-background-surface)',
              padding: '0px',
              maxWidth: styles?.maxWidth ?? '37.5em',
              margin: 'auto',
              borderRadius: '0.4em',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
        >
            {children}
        </Sheet>
  )
}
