import { stepViewerInputsArray, stepViewerInputsSchema } from '@/components/StepViewer/models'
import { ContentLayout } from '@/layouts/ContentLayout'
import { loggerInstance } from '@/services'
import Box from '@mui/joy/Box'
import { lazy, useState } from 'react'

const Form = lazy(() => import('@/components/Form/Form'))

export const StepViewerMain = () => {
  const [isEditing, setIsEditing] = useState(false)

  const handleOnClickForEditing = () => {
    setIsEditing(true)
  }

  const handleOnSubmit = (data: unknown) => {
    loggerInstance.log('StepViewerMain.tsx - 17', data)
    setIsEditing(false)
  }

  return (
    <Box
      component='main'
      sx={{
        display: 'flex',
        width: '100%',
        position: 'relative',
        height: '100%',
        whiteSpace: 'nowrap',
        alignSelf: 'stretch',
        flexGrow: 1,
        scrollBehavior: 'smooth',
        overflowX: 'hidden'
      }}
    >
      {
        Array(5).fill(null).map((_, index) => (
          <ContentLayout
            key={index}
            id={String(index)}
            styles={{
              paddingInline: '1em',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '3em',
              gap: '1em',
              carrousel: {
                maxWidth: '25em',
                borderRadius: '0.5em'
              },
              informationSection: {
                paddingInline: '0',
                alignSelf: 'start'
              }
            }}

            information={
              <Box
                onClick={handleOnClickForEditing}
                sx={{
                  maxWidth: {
                    md: '35em',
                    xs: '100%'
                  }
                }}
              >
                <Form
                  buttonSubmitName='Save'
                  showMainButton={isEditing}
                  showResetButton={false}
                  inputsDataMain={stepViewerInputsArray}
                  schema={stepViewerInputsSchema}
                  onSubmit={handleOnSubmit}
                  buttonSubmitSide='default'
                  styles={{
                    width: '100%',
                    display: 'grid',
                    marginY: '0px',
                    paddingX: '0px',
                    paddingY: '0px',
                    border: 'none',
                    gridTemplateAreasMain: '"stepName" "stepDescription"'
                  }}
                  inputStyles={{
                    textArea: {
                      border: 'none',
                      fontSize: '0.875em',
                      paddingInline: '0px',
                      label: {
                        display: 'none'
                      }
                    },
                    textField: {
                      border: 'none',
                      fontSize: 'clamp(1em, 7vw ,2.25em)',
                      fontWeight: '600',
                      paddingInline: '0px',
                      label: {
                        display: 'none'
                      }
                    }
                  }}
                  buttonsDesign={{
                    color: 'neutral',
                    variant: 'outlined'
                  }}
                />
              </Box>
            }
          />
        ))
      }
    </Box>
  )
}
