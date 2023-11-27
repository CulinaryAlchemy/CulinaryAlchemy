import { Image } from '@/components'
import Popper from '@mui/base/Popper'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Sheet from '@mui/joy/Sheet'
import Tooltip from '@mui/joy/Tooltip'
import Typography from '@mui/joy/Typography'
import { type UseFormRegisterReturn } from 'react-hook-form'
import { usePopperDropZone } from './hooks'

interface IPropsPopperDropZone {
  showDropZoneArea: boolean
  anchorEl: HTMLElement
  maxFiles: number
  error: string
  register: UseFormRegisterReturn<string>
}

const PopperDropZone: React.FC<IPropsPopperDropZone> = ({ showDropZoneArea, register: { onChange, ...register }, anchorEl, maxFiles, error }) => {
  const { addImages, imageFiles, removeImage, warning } = usePopperDropZone({ inputName: register.name, maxFiles })

  const handleOnClickForRemoveImage = (fileIndex: number) => () => {
    removeImage(fileIndex)
  }

  const handleOnClickForAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newImages: FileList | File[] | null = event.currentTarget.files
    newImages = newImages != null ? Array.from(newImages) : null

    if (newImages == null) return
    addImages(newImages)
  }

  const tooltipMessage = warning ?? error

  return (
    <Popper
      id='app-popper'
      open={showDropZoneArea}
      anchorEl={anchorEl}
      placement='bottom-end'
      slotProps={{
        root: {
          style: {
            zIndex: 10000
          }
        }
      }}
    >
      <Tooltip
        open={tooltipMessage != null}
        title={tooltipMessage}
        color={error ? 'danger' : warning ? 'warning' : 'neutral'}
        placement='top-start'
        sx={{
          zIndex: 10000
        }}
      >
        <Sheet
          variant='outlined'
          color={error ? 'danger' : warning ? 'warning' : 'neutral'}
          sx={{
            position: 'relative',
            borderRadius: '0.3em',
            minWidth: '14.375em',
            maxWidth: {
              xs: '14.375em',
              sm: '34.375em',
              md: '56.25em'
            },
            maxHeight: {
              xs: '14.5em',
              md: '18.75em'
            },
            overflowY: 'auto'
          }}
        >
          <Box
            component='header'
            sx={{
              position: 'sticky',
              top: 0,
              padding: '0.5em',
              display: 'flex',
              gap: '1.5em',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '0.1em var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-200, #D8D8DF)) solid',
              zIndex: 300,
              backgroundColor: 'var(--joy-palette-background-surface)'
            }}
          >
            <Typography
              sx={{
                fontWeight: 700
              }}
            >
              Images
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '0.5em',
                alignItems: 'center'
              }}
            >
              {imageFiles?.[0] != null &&
                <Typography
                  sx={{
                    fontSize: '0.8em'
                  }}
                >
                  {imageFiles?.length} / {maxFiles}
                </Typography>
              }
              <FormControl>
                <FormLabel
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'start',
                    height: '100%',
                    margin: 0,
                    borderRadius: '0.3em',
                    border: 'var(--variant-borderWidth) solid',
                    borderColor: 'var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-200, #D8D8DF))',
                    cursor: 'pointer',
                    fontSize: '0.8em',
                    padding: '0.3em',
                    '&:hover': {
                      color: 'var(--joy-palette-neutral-outlinedHoverColor, var(--joy-palette-neutral-900, #131318))',
                      backgroundColor: 'var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EBEBEF))',
                      borderColor: 'var(--joy-palette-neutral-outlinedHoverBorder, var(--joy-palette-neutral-300, #B9B9C6)'
                    }
                  }}
                >
                  Add image
                </FormLabel>
                <Input
                  type='file'
                  {...(error !== '' && { error: true })}
                  {...register}
                  onChange={handleOnClickForAddImages}
                  sx={{
                    display: 'none',
                    'input[type="file"]': {
                      width: '100%'
                    }
                  }}
                  slotProps={{
                    input: {
                      multiple: true
                    }
                  }}
                />
              </FormControl >
            </Box>
          </Box>
          {
            (imageFiles?.[0] != null) &&
            <Box
              component='main'
              sx={{
                padding: '0.5em',
                maxWidth: '98vw',
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5em',
                flexGrow: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                scrollBehavior: 'smooth',
                flexWrap: 'wrap'
              }}
            >
              {
                Array.from(imageFiles).map((file, index) => {
                  const imageURL = URL.createObjectURL(file)
                  return (
                    <Box
                      sx={{
                        position: 'relative',
                        maxHeight: '10em',
                        maxWidth: '10em',
                        borderRadius: '0.5em',
                        overflow: 'hidden',
                        border: '0.1em var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-200, #D8D8DF)) solid'
                      }}
                      key={file.name}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          display: 'flex',
                          justifyContent: 'right',
                          alignItems: 'start',
                          width: '100%',
                          height: '100%',
                          zIndex: 100,
                          ':after': {
                            content: '""',
                            position: 'absolute',
                            width: '100%',
                            height: '50%',
                            background: 'linear-gradient(0deg, rgba(34,193,195,0) 0%, rgba(0,0,0,0.5) 100%)'
                          }
                        }}
                      >
                        <Button
                          color='danger'
                          variant='plain'
                          size='sm'
                          sx={{
                            width: 'auto',
                            height: 'auto',
                            minHeight: 'auto',
                            padding: '0.5em',
                            fontSize: '0.7em',
                            zIndex: 200,
                            '&:hover': {
                              background: 'none'
                            }
                          }}

                          onClick={handleOnClickForRemoveImage(index)}
                        >
                          Remove
                        </Button>
                      </Box>
                      <Image
                        src={imageURL}
                        alt='user image'
                        onUnmount={() => {
                          URL.revokeObjectURL(imageURL)
                        }}
                        style={{
                          objectFit: 'cover',
                          flexShrink: 0,
                          flexBasis: '100%'
                        }}
                      />
                    </Box>
                  )
                })
              }
            </Box>
          }
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '0.5em'
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: 'var(--Typography-fontSize, var(--joy-fontSize-sm, 0.875rem))', textWrap: 'balance', color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))' }}
              color={error ? 'danger' : 'neutral'}
            >
              {(imageFiles?.length === 0 || imageFiles == null) && 'Add images'}
            </Typography>
          </Box>
        </Sheet>
      </Tooltip>
    </Popper >
  )
}

export default PopperDropZone
