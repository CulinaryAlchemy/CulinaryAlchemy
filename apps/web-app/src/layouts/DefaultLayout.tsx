import Sheet from '@mui/joy/Sheet'

interface IProps {
  children: React.ReactNode
}

export const DefaultLayout: React.FC<IProps> = ({ children }) => {
  return (
        <Sheet
            variant='outlined'
            sx={{
              backgroundColor: 'var(--joy-palette-background-surface)',
              padding: '0px',
              maxWidth: '37.5em',
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
