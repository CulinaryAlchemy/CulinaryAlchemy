import { Form } from '@/components'
import { stepViewerInputsArray, stepViewerInputsSchema } from '@/components/StepViewer/models'
import { ContentLayout } from '@/layouts'
import { type IStep } from '@/models/LOGIC'
import Box from '@mui/joy/Box'
import { useStep } from '../hooks/useStep'

interface IProps {
  id: string
  isEditable: boolean
  stepData: IStep
  updateStep: (oldStepName: string, updatedStep: IStep) => void
  resetStep: (stepTitle: string, oldStepValues: IStep) => void
  navigationElement: React.ReactNode
}

const defaultCarouselImages = [{ blur_url: 'https://portfolio-three-chi-27.vercel.app/song-dragon-peak-1-resized.webp', default_url: 'https://portfolio-three-chi-27.vercel.app/song-dragon-peak-1.webp' }, { blur_url: 'https://portfolio-three-chi-27.vercel.app/song-ocean-1-resized.webp', default_url: 'https://portfolio-three-chi-27.vercel.app/song-ocean-1.webp' }]

const Step: React.FC<IProps> = ({ isEditable, id, stepData, updateStep, navigationElement }) => {
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
      images={defaultCarouselImages}
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
