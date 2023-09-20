
import { Recipe, TabPanel, TabsPage } from '@/components'
import { CTabsData } from '@/pages/User/models/UI/'



export const UserMain = () => {
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
                {Array(5).fill(null).map((_, index) => (
                  <Recipe
                    key={String(index)}
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
