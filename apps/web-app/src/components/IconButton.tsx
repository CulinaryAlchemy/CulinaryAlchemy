import DefaultIconButton from '@mui/joy/IconButton'

interface IProps {
  children: React.ReactNode
  onClick: () => unknown
}

export const IconButton: React.FC<IProps> = ({ children, onClick }) => {
  return (
        <DefaultIconButton
            variant='plain'
            color='neutral'
            onClick={onClick}
            sx={{
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}
        >
            {children}
        </DefaultIconButton>

  )
}
