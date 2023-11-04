
import { Recipe, TabPanel, TabsPage } from '@/components'
import { MessageLayout } from '@/layouts'
import { CTabsData } from '@/pages/User/models/UI/'
import Typography from '@mui/joy/Typography'

interface IProps {
  recipesIds: Array<{ id: number }>
}

export const UserMain: React.FC<IProps> = ({ recipesIds }) => {
  return (
    <main>
      <TabsPage
        defaultTab={CTabsData.recipes.name}
        type='no-routing'
        tabsData={Object.values(CTabsData)}
        tabPanels={
          <>
            {Object.values(CTabsData).map((tabName) => (
              <TabPanel routingBy='defaultUISystem' key={tabName.name} value={tabName.name} loading={false} >
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
              </TabPanel>
            ))}
          </>
        }
        styles={{
          background: 'theme',
          direction: 'column',
          tabs: {
            names: {
              direction: 'row'
            }
          }
        }}
      />
    </main>
  )
}
