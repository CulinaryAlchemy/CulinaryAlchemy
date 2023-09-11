import { GlobalLayout } from '@/layouts'
import { metadata } from './config'

/* const RecipesTabPanel = lazy(() => import('@/pages/Home/components/TabPanels/RecipesTabPanel')) */

const Index = () => {
  return (
    <GlobalLayout newTitle={metadata.title}>
      {/* <DefaultLayout>
        <TabsPage
          defaultTab={CHomeTabPanelNames.userFeed.name}
          type='no-routing'
          tabsData={Object.values(CHomeTabPanelNames)}
          tabPanels={
            <>
              <RecipesTabPanel />
            </>
          }
          styles={{
            maxWidth: '37.5em',
            background: 'theme',
            direction: 'column',
            tabs: {
              names: {
                direction: 'row'
              }
            }
          }}
        />
      </DefaultLayout> */}
    </GlobalLayout>
  )
}

export default Index
