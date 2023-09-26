import { Form, TabPanel } from '@/components'
import { useTranslation } from '@/hooks'
import { CTabsData, dietaryPreferencesInputsSchema, dietaryPreferencesSelectedInputsArray } from '@/pages/Settings/models/UI'
import { loggerInstance } from '@/services'
import { type SubmitHandler } from 'react-hook-form'

const DietaryPreferencesPanel = () => {
  const { t } = useTranslation()

  const handleOnSubmit: SubmitHandler<Record<string, boolean>> = (data) => {
    loggerInstance.log('DietaryPreferencesTabPanel.tsx', data)
  }

  return (
        <TabPanel
            routingBy='routingSystem'
            value={CTabsData.dietaryPreferences.name}
            loading={false}
            title={CTabsData.dietaryPreferences.traduction}
            description={CTabsData.dietaryPreferences.description}
            showBackNavigation={false}
        >
          <Form
            buttonSubmitName={t('save')}
            onSubmit={handleOnSubmit}
            inputsDataMain={dietaryPreferencesSelectedInputsArray}
            schema={dietaryPreferencesInputsSchema}
            buttonSubmitSide='default'
            styles={{
              flexWrap: 'wrap',
              width: '100%',
              border: 'none',
              display: 'flex',
              marginY: '1em',
              paddingY: '0px',
              justifyContent: 'center'
            }}
          />
        </TabPanel>
  )
}

export default DietaryPreferencesPanel
