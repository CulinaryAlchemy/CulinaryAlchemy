import { MessageLayout } from '@/layouts'
import { type IApiResponse, type IRecipe, type IUser, type IUserApiResponse } from '@/models/LOGIC'
import { CBackRoutes } from '@/routing'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import useSWR from 'swr'
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
  userId: number | undefined
  recipeData: IRecipe | null | undefined
}

export const PostLayout: React.FC<IProps> = ({ children, styles, isLoading, type, userId, recipeData }) => {
  const { data, isLoading: isLoadingUser } = useSWR<IApiResponse<IUserApiResponse>>(userId != null && CBackRoutes.Dynamic.user.getById(userId))

  if (isLoading || isLoadingUser) {
    return <PostLayoutSkeleton {...{ type, styles }} />
  }

  const isThereAError = data?.error ?? userId

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
        paddingBlock: '0.6em',
        minHeight: '606.78px'
      }}
    >
      {
        isThereAError == null
          ? (
            <MessageLayout
              styles={{
                position: 'relative'
              }}
            >
              <Typography level='h4'>Something went wrong</Typography>
            </MessageLayout>
            )
          : (
            <>
              <PostHeader userData={data?.data as IUser} recipeData={recipeData} />
              <Stack
                sx={{
                  width: '100%'
                }}
              >
                {children}
              </Stack>
              <PostFooter />
            </>
            )
      }
    </Sheet>
  )
}









