import { AppLink } from '@/components'
import { ContentLayout, PostLayout } from '@/layouts'
import { CFrontRoutes } from '@/routing'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

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
  showStartCookingButton: boolean
  recipeId?: string
}

export const Recipe: React.FC<IProps> = ({ recipeId, styles, showStartCookingButton }) => {
  return (
    <PostLayout
      styles={{
        border: styles.border,
        gap: styles.gap,
        cursor: styles.cursor
      }}
    >
      <ContentLayout
        styles={styles.content}
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
                  <AppLink to={CFrontRoutes.Dynamic.recipe('holaaa')} sx={{ color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D)) !important' }} >
                    La paste cream
                  </AppLink>
                </Typography>
              </header>
              <main>
                <Typography
                  level='body2'
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia at neque voluptates eius enim, asperiores cumque incidunt perspiciatis consequatur voluptatum, assumenda fuga atque labore nesciunt facere. In quis qui quas!
                </Typography>
              </main>
              <footer>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'end'
                  }}
                >
                  {showStartCookingButton &&
                    <AppLink
                      to={CFrontRoutes.Dynamic.cooking(recipeId as string)}
                      color='warning'
                      variant='soft'
                      sx={{
                        padding: '0.5em'
                      }}
                    >
                      Start cooking
                    </AppLink>
                  }
                </Box>
              </footer>
            </Box>
          </section>
        }
      />
    </PostLayout>
  )
}
