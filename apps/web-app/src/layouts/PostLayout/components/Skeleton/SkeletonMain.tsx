import Stack from '@mui/joy/Stack'

interface IPostLayoutSkeletonMainProps {
  children: React.ReactNode
}

export const PostLayoutSkeletonMain: React.FC<IPostLayoutSkeletonMainProps> = ({ children }) => {
  return (
      <Stack
        sx={{
          width: '100%'
        }}
      >
        {children}
      </Stack>
  )
}
