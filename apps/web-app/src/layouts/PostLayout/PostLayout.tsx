import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import { PostFooter, PostHeader, PostLayoutSkeleton } from './components'

interface IStyles {
  border?: 'none'
  gap?: string
  cursor?: 'pointer'
}

interface IProps {
  children: React.ReactNode
  styles?: IStyles
  isLoading: boolean
  type: 'default' | 'recipe'
}

export const PostLayout: React.FC<IProps> = ({ children, styles, isLoading, type }) => {
  if (isLoading) {
    return <PostLayoutSkeleton {...{ type, styles }} />
  }

  return (
    <Sheet
      component='article'
      variant='outlined'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: styles?.gap ?? '0.5em',
        border: styles?.border,
        borderRight: 'none',
        borderLeft: 'none',
        borderTop: 'none',
        paddingBottom: '0.2em',
        cursor: styles?.cursor,
        width: '100%',
        paddingBlock: '1em'
      }}
    >
      <PostHeader />
      <Stack
        sx={{
          width: '100%'
        }}
      >
        {children}
      </Stack>
      <PostFooter />
    </Sheet>
  )
}









