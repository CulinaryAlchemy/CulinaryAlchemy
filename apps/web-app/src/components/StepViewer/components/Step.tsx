import { Form } from '@/components'
import { stepViewerInputsArray, stepViewerInputsSchema } from '@/components/StepViewer/models'
import { ContentLayout } from '@/layouts'
import { type IStep } from '@/models/LOGIC'
import { toastUtils } from '@/utils'
import Box from '@mui/joy/Box'
import { useStep } from '../hooks/useStep'

interface IProps {
  id: string
  isEditable: boolean
  stepData: IStep
  updateStep: (oldStepName: string, updatedStep: IStep) => void
  resetStep: (stepTitle: string, oldStepValues: IStep) => void
  onSaveStep: (data: IStep) => Promise<unknown>
  navigationElement: React.ReactNode
}

const Step: React.FC<IProps> = ({ isEditable, id, stepData, updateStep, resetStep, onSaveStep, navigationElement }) => {
  const { isEditing, toggleIsEditing } = useStep(stepData.stepName === '')

  const handleOnClickForEditing = () => {
    if (isEditable) {
      toggleIsEditing()
    }
  }

  const handleOnSubmit = (data: unknown) => {
    if (isEditing && isEditable) {
      updateStep(stepData.stepName, data as IStep)
    }

    const step = data as IStep
    onSaveStep(step)
      .catch(() => {
        resetStep(step.stepName, stepData)
        toastUtils.error('The step was not added/modified. Something went wrong.')
      })
    toggleIsEditing(false)
  }

  return (
    <ContentLayout
      {...{ id }}
      key={stepData.stepName}
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
          alignSelf: 'start',
          maxWidth: '30em',
          width: '100%'
        }
      }}

      information={
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            onDoubleClick={handleOnClickForEditing}
            sx={{
              flexGrow: 1,
              maxWidth: {
                md: '30em',
                xs: '100%'
              }
            }}
          >
            <Form
              buttonSubmitName='Save'
              showMainButton={isEditing}
              areInputsReadOnly={!isEditing}
              showResetButton={false}
              inputsDataMain={stepViewerInputsArray}
              defaultValues={{
                stepName: stepData.stepName,
                stepDescription: stepData.stepDescription
              }}
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
          {navigationElement}
        </Box>
      }
    />
  )
}

export default Step
