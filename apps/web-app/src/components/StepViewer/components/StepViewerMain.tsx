import { useStepViewerMain, useSyncStepsWithBackend } from '@/components/StepViewer/hooks'
import { MessageLayout } from '@/layouts'
import { type TStepArray } from '@/models/LOGIC'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'
import Typography from '@mui/joy/Typography'
import React, { Suspense, lazy, startTransition } from 'react'

const Step = lazy(() => import('@/components/StepViewer/components/Step'))

interface IProps {
  recipeId: string | undefined
  isEditable: boolean
  defaultSteps: TStepArray | undefined

}
const StepViewerMain: React.FC<IProps> = ({ recipeId, isEditable, defaultSteps }) => {
  const {
    steps,
    isTheFirstStepOptimistic,
    toggleIsTheFirstStepOptimistic,
    addNewStep,
    updateStep,
    resetStep
  } = useStepViewerMain(
    defaultSteps
  )
  useSyncStepsWithBackend(recipeId, steps)

  const handleOnClickForRemoveMessage = () => {
    startTransition(() => {
      toggleIsTheFirstStepOptimistic()
    })
  }

  const handleOnClickForAddAStep = () => {
    addNewStep({ stepName: '', stepDescription: '' })

    if (steps == null) return

    setTimeout(() => {
      if (steps.at(-1)?.stepName !== '') {
        location.hash = `${steps?.length}`
      } else {
        location.hash = `${steps?.length - 1}`
      }
    }, 300)
  }

  return (
    <Suspense>
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
          (isEditable) &&
          (
            <Box
              sx={{
                position: 'fixed',
                bottom: '0.5em',
                right: '0.5em',
                zIndex: 1000
              }}
            >
              <IconButton variant='soft' color='neutral' onClick={handleOnClickForAddAStep}>
                <AddIcon />
              </IconButton>
            </Box>
          )
        }
        {
          steps?.[0] == null && isTheFirstStepOptimistic
            ? (
              <MessageLayout>
                <Box
                  sx={{
                    mt: '5em',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography sx={{ fontSize: '3.3em', fontWeight: 'bold' }}>NO STEPS FOUND</Typography>
                  {
                    (isEditable) &&
                    (
                      <Button
                        color='neutral'
                        variant='outlined'
                        size='lg'
                        onClick={handleOnClickForRemoveMessage}
                      >
                        Click to add one
                      </Button>
                    )
                  }
                </Box>
              </MessageLayout>
              )
            : (
                steps?.map((step, index) => (
                <Step
                  id={String(index)}
                  key={step.stepName}
                  stepData={step}
                  {...{ resetStep, updateStep, isEditable }}
                  navigationElement={
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      {
                        index !== 0 && (<a href={`#${index - 1}`}>Previous</a>)
                      }

                      {
                        index !== steps.length - 1 && (<a href={`#${index + 1}`}>Next</a>)
                      }
                    </Box>
                  }
                />
                ))
              )
        }
      </Box>
    </Suspense>
  )
}

export default StepViewerMain
