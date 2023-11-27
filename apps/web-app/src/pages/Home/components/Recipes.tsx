import { Loading, Recipe } from '@/components'
import { MessageLayout } from '@/layouts'
import { type IApiResponse, type TRecipeArray } from '@/models/LOGIC'
import { CBackRoutes } from '@/routing'
import { Typography } from '@mui/joy'
import Box from '@mui/joy/Box'
import Sheet from '@mui/joy/Sheet'
import useSWR from 'swr'

export const Recipes = () => {
  const { data, isLoading } = useSWR<IApiResponse<TRecipeArray>>(CBackRoutes.Static.recipe.all)

  if (isLoading) {
    return (
      <Box
        sx={{
          position: 'relative',
          minHeight: '10em'
        }}
      >
        <MessageLayout>
          <Loading size='md' />
        </MessageLayout>
      </Box>
    )
  }

  if (data?.data?.length === 0) {
    return (
      <Box
        sx={{
          position: 'relative',
          minHeight: '10em'
        }}
      >
        <MessageLayout>
          <Typography>There are not any recipes yet. Be the first :D</Typography>
        </MessageLayout>
      </Box>
    )
  }

  return (
    <Box>
      <Sheet sx={{ maxWidth: '37.5em', margin: 'auto' }}>
        {
          data?.data?.map((recipeId) => (
            <Recipe
              recipeId={recipeId.id ?? 0}
              key={recipeId.id}
              showStartCookingButton={false}
              styles={{
                cursor: 'pointer',
                content: {
                  flexDirection: 'column',
                  gap: '1em',
                  carrousel: {
                    maxWidth: '100%'
                  },
                  informationSection: {
                    paddingInline: '1em'
                  }
                }
              }}
            />
          ))
        }
      </Sheet>
    </Box>
  )
}
