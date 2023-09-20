import { useStepViewerMain } from '@/components/StepViewer/hooks/'
import { stepViewerInputsArray, stepViewerInputsSchema } from '@/components/StepViewer/models'
import { ContentLayout } from '@/layouts/ContentLayout'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import { lazy } from 'react'

const Form = lazy(() => import('@/components/Form/Form'))

export const StepViewerMain = () => {
  const { isEditModeEnable, toggleEditMode } = useStepViewerMain()

  const handleOnClick = () => {
    toggleEditMode()
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
                sx={{
                  maxWidth: {
                    md: '35em',
                    xs: '100%'
                  }
                }}
              >
                {
                  isEditModeEnable
                    ? <Form
                      buttonSubmitName='Save'
                      inputsData={stepViewerInputsArray}
                      schema={stepViewerInputsSchema}
                      onSubmit={() => { handleOnClick() }}
                      buttonSubmitSide='default'
                      styles={{
                        width: '100%',
                        display: 'grid',
                        marginY: '0px',
                        paddingX: '0px',
                        paddingY: '0px',
                        border: 'none'
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
                    />
                    : <>
                      <Typography
                        onClick={handleOnClick}
                        level='h2'
                      >
                        Sal
                      </Typography>
                      <Typography
                        level='body2'
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam illo sint alias asperiores amet, vitae corporis, sunt velit vel ipsam porro. Facilis atque corporis quod vel ipsa expedita sed dolore?
                      </Typography>
                      <a
                        href={`#${index - 1}`}
                      >
                        Previous
                      </a>
                      -
                      <a
                        href={`#${index + 1}`}
                      >
                        Next
                      </a>
                    </>
                }
              </Box>
            }
          />
        ))
      }
    </Box>
  )
}
