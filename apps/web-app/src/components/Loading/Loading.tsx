import CircularProgress from '@mui/joy/CircularProgress'

interface IProps {
  size: 'sm' | 'md' | 'lg'
}
export const Loading: React.FC<IProps> = ({ size }) => {
  return (
      <CircularProgress color='neutral' size={size} />
  )
}
