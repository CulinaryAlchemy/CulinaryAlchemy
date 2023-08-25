import Typography from '@mui/joy/Typography'

interface IProps {
  text: string
}

export const Error: React.FC<IProps> = ({ text }) => {
  return (
        <Typography
            level="body3"
            color='danger'
            sx={{ alignSelf: 'flex-end', textTransform: 'capitalize' }}
        >
            {text !== '' && text}
        </Typography>
  )
}
