import { type TDropZoneForm } from '@/components/Form/models'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Stack from '@mui/joy/Stack'
import Tooltip from '@mui/joy/Tooltip'
import Typography from '@mui/joy/Typography'
import { useEffect, useState } from 'react'
import { type FieldValues, type UseFormRegisterReturn, type UseFormWatch } from 'react-hook-form'

interface IProps {
  data: TDropZoneForm
  error: string
  register: UseFormRegisterReturn<string>
  watch: UseFormWatch<FieldValues>
}

const DropZone: React.FC<IProps> = ({ data, error, register, watch }) => {
  const [isThereError, setIsThereError] = useState(false)
  const files = watch(data.name) as FileList

  useEffect(() => {
    if (error == null) return
    setIsThereError(true)

    const timeout = setTimeout(() => {
      setIsThereError(false)
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [error])

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      {files?.[0] != null &&
        <Typography
          level='body3'
        >
          {files.length} / 4
        </Typography>
      }
      <Tooltip title={error} open={isThereError}>
        <FormControl>
          <FormLabel
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'start',
              height: '100%',
              margin: 0,
              borderRadius: 'var(--IconButton-radius, var(--joy-radius-sm))',
              border: 'var(--variant-borderWidth) solid',
              borderColor: 'var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-200, #D8D8DF))',
              cursor: 'pointer',
              padding: '0.5em 0.6em',
              '&:hover': {
                color: 'var(--joy-palette-neutral-outlinedHoverColor, var(--joy-palette-neutral-900, #131318))',
                backgroundColor: 'var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EBEBEF))',
                borderColor: 'var(--joy-palette-neutral-outlinedHoverBorder, var(--joy-palette-neutral-300, #B9B9C6)'
              }
            }}
          >
            <AddPhotoAlternateIcon
              sx={{
                cursor: 'pointer',
                fontSize: '1.7em',
                opacity: '60%',
                color: error && '#ff6666',
                margin: 0
              }}
            />
          </FormLabel>
          <Input
            type={data.type}
            {...(error !== '' && { error: true })}
            {...register}
            sx={{
              display: 'none',
              'input[type="file"]': {
                width: '100%'
              }
            }}
          />
        </FormControl >
      </Tooltip>
    </Stack>
  )
}

export default DropZone
