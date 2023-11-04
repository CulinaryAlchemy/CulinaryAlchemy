
import { Recipe } from '@/components'
import { MessageLayout } from '@/layouts'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

interface IProps {
  recipesIds: Array<{ id: number }>
}

export const UserMain: React.FC<IProps> = ({ recipesIds }) => {
  return (
    <Box
      component='main'
      sx={{
        borderTop: '0.1em solid var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-200, #D8D8DF));'
      }}
    >
      {
        recipesIds[0] != null
          ? (
              recipesIds?.map((recipeId) => (
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
            )
          : (
            <MessageLayout>
              <Typography level='h3' sx={{ textTransform: 'uppercase' }}>No recipes found</Typography>
            </MessageLayout>
            )
      }
    </Box>
  )
}
