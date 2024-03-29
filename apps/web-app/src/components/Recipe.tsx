import { AppLink } from '@/components'
import { ContentLayout, PostLayout } from '@/layouts'
import { type IApiResponse, type IRecipe } from '@/models/LOGIC'
import { CBackRoutes, CFrontRoutes } from '@/routing'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import useSWR from 'swr'

interface IStyles {
  border?: 'none'
  gap?: string
  cursor?: 'pointer'
  content: {
    paddingInline?: string
    flexDirection: 'column' | 'row'
    gap?: string
    carrousel: {
      maxWidth: string
      borderRadius?: string
    }
    informationSection: {
      paddingInline?: string
    }
  }
}

interface IProps {
  styles: IStyles
  recipeId: number
}

export const Recipe: React.FC<IProps> = ({ recipeId, styles }) => {
  const { data, isLoading } = useSWR<IApiResponse<IRecipe>>(CBackRoutes.Dynamic.recipe.getById(recipeId))

  return (
    <PostLayout
      recipeData={data?.data}
      userId={data?.data?.user_id}
      type='recipe'
      {...{ isLoading }}
      styles={{
        border: styles.border,
        gap: styles.gap,
        cursor: styles.cursor
      }}
    >
      <ContentLayout
        styles={styles.content}
        images={data?.data?.images}
        information={
          <section>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3em',
                paddingInline: styles.content.informationSection.paddingInline
              }}
            >
              <header>
                <Typography
                  level='h4'
                  sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}
                >
                  <AppLink to={CFrontRoutes.Dynamic.recipe(String(data?.data?.id))} sx={{ color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D)) !important' }} >
                    {data?.data?.title}
                  </AppLink>
                </Typography>
              </header>
              <Typography
                sx={{ display: '-webkit-box', '-webkit-line-clamp': '1', '-webkit-box-orient': 'vertical', overflow: 'hidden', wordWrap: 'break-word', fontSize: 'var(--Typography-fontSize, var(--joy-fontSize-sm, 0.875rem))', textWrap: 'balance', color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))' }}
              >
                {data?.data?.description}
              </Typography>
              <footer>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'end'
                  }}
                >
                  <AppLink
                    to={CFrontRoutes.Dynamic.cooking(String(recipeId))}
                    color='warning'
                    variant='soft'
                    sx={{
                      padding: '0.5em'
                    }}
                  >
                    Start cooking
                  </AppLink>
                </Box>
              </footer>
            </Box>
          </section>
        }
      />
    </PostLayout>
  )
}
