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
                {
                    Array(5).fill(null).map((_, index) => (
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
            </Sheet>
        </TabPanel>
  )
}

export default RecipesTabPanel
