import { PublicationBox, Recipe } from '@/components'
import { homeInputsArrayFooter, homeInputsArrayMain, homeInputsSchema } from '@/pages/Home/models'
import { loggerInstance } from '@/services'
import Sheet from '@mui/joy/Sheet'

const RecipesTabPanel = () => {
  return (
        <>
            <PublicationBox
                onSubmit={(data) => { loggerInstance.log('RecipesTabPanel.tsx', data) }}
                inputsDataMain={homeInputsArrayMain}
                inputsDataFooter={homeInputsArrayFooter}
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
        </>
  )
}

export default RecipesTabPanel
