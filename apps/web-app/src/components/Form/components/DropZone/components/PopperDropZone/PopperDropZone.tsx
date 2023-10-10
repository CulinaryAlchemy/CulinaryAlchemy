import { Image } from '@/components'
import Popper from '@mui/base/Popper'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import { type UseFormRegisterReturn } from 'react-hook-form'

interface IPropsPopperDropZone {
  showDropZoneArea: boolean
  anchorEl: HTMLElement
  imageFiles: FileList
  maxFiles: number
  error: string
  register: UseFormRegisterReturn<string>
}

const PopperDropZone: React.FC<IPropsPopperDropZone> = ({ showDropZoneArea, register, anchorEl, imageFiles, maxFiles, error }) => {
  return (
            <Popper
                id='app-popper'
                open={showDropZoneArea}
                anchorEl={anchorEl}
                placement='bottom-end'
            >
                <Sheet
                    variant='outlined'
                    color={error ? 'danger' : 'neutral'}
                    sx={{
                      borderRadius: '0.3em'
                    }}
                >
                    <Box
                        component='header'
                        sx={{
                          padding: '0.5em',
                          display: 'flex',
                          gap: '1.5em',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '0.1em var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-200, #D8D8DF)) solid'
                        }}
                    >
                        <Typography
                            level='body1'
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
                                    level='body4'
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
                        (error === '' && imageFiles?.[0] != null && imageFiles.length <= 4) &&
                        <Box
                            component='main'
                            sx={{
                              padding: '0.5em',
                              maxWidth: '98vw',
                              display: 'flex',
                              gap: '1em',
                              flexGrow: 0,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              scrollBehavior: 'smooth',
                              flexWrap: 'wrap'
                            }}
                        >
                            {
                                Array.from(imageFiles).map((file) => {
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
                            level='body2'
                            sx={{
                              fontWeight: 700
                            }}
                            color={error ? 'danger' : 'neutral'}
                        >
                            {(error === '' && imageFiles?.length === 0) && 'Add images'}
                            {error}
                        </Typography>
                    </Box>
                </Sheet>
            </Popper>
  )
}

export default PopperDropZone
