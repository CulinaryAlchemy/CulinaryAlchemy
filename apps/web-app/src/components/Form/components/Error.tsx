import Typography from '@mui/joy/Typography'

interface IProps {
  text: string
}

export const Error: React.FC<IProps> = ({ text }) => {
  return (
        <Typography
            color='danger'
            sx={{ alignSelf: 'flex-end', textTransform: 'capitalize', fontSize: '0.8em' }}
        >
            {text !== '' && text}
        </Typography>
  )
}
