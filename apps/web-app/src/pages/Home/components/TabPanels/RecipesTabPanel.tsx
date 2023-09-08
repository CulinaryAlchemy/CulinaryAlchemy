import { PublicationBox, Recipe, TabPanel } from '@/components'
import { CHomeTabPanelNames, homeInputsArray, homeInputsSchema } from '@/pages/Home/models'
import Sheet from '@mui/joy/Sheet'

const RecipesTabPanel = () => {
  return (
        <TabPanel
            showHeader={CHomeTabPanelNames.userFeed.showTabHeader}
            routingBy="defaultUISystem"
            value={CHomeTabPanelNames.userFeed.name}
            loading={false}
        >
            <PublicationBox
                onSubmit={() => { }}
                inputsData={homeInputsArray}
                schema={homeInputsSchema}
            />
            <Sheet sx={{ maxWidth: '37.5em', margin: 'auto' }}>
                <Recipe />
                <Recipe />
                <Recipe />
                <Recipe />
                <Recipe />
                <Recipe />
            </Sheet>
        </TabPanel>
  )
}

export default RecipesTabPanel
