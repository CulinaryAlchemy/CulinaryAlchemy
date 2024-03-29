import {
  PostLayoutSkeletonHeader,
  PostLayoutSkeletonMain
} from '@/layouts/PostLayout/components/'
import Sheet from '@mui/joy/Sheet'
import Skeleton from '@mui/joy/Skeleton'

interface IStyles {
  border?: 'none'
  gap?: string
  cursor?: 'pointer'
}

interface IPropsSkeleton {
  type: 'default' | 'recipe'
  styles?: IStyles
}

export const PostLayoutSkeleton: React.FC<IPropsSkeleton> = ({
  styles,
  type
}) => {
  return (
    <Sheet
      component="article"
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: styles?.gap ?? '0.5em',
        border: styles?.border,
        borderTop: 'none',
        borderRight: 'none',
        borderLeft: 'none',
        paddingBottom: '0.2em',
        cursor: styles?.cursor,
        width: '100%',
        paddingBlock: '1em',
        alignItems: 'center',
        minHeight: '606.78px'
      }}
    >
      <PostLayoutSkeletonHeader />
      <PostLayoutSkeletonMain>
        {type === 'recipe' && (
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              minHeight: '25em',
              borderRadius: 0
            }}
          />
        )}
        {type === 'default' && (
          <>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" />
          </>
        )}
      </PostLayoutSkeletonMain>
    </Sheet>
  )
}
