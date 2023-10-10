import { type TDropZoneForm } from '@/components/Form/models'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'
import Stack from '@mui/joy/Stack'
import Tooltip from '@mui/joy/Tooltip'

import React, { Suspense, lazy, useRef, useState, type LegacyRef } from 'react'
import { type FieldValues, type UseFormRegisterReturn, type UseFormWatch } from 'react-hook-form'



const PopperDropZone = lazy(() => import('./components/PopperDropZone/PopperDropZone'))

interface IProps {
  data: TDropZoneForm
  error: string
  register: UseFormRegisterReturn<string>
  watch: UseFormWatch<FieldValues>
}

const DropZone: React.FC<IProps> = ({ data, error, register, watch }) => {
  const [showDropZoneArea, setShowDropZoneArea] = useState(false)
  const elementContainer = useRef<LegacyRef<HTMLDivElement>>(null)

  const files = watch(register.name) as FileList

  const toggleShowDropZoneArea = () => {
    setShowDropZoneArea((prevState) => !prevState)
  }

  return (
    <Tooltip
      open={error != null && !showDropZoneArea}
      title={error}
      color='danger'
      placement='bottom'
    >
      <Box
        ref={elementContainer}
        sx={{
          position: 'relative',
          gridArea: register.name
        }}
      >
        <Suspense>
          <PopperDropZone
            {...{ error, register, showDropZoneArea }}
            imageFiles={files}
            anchorEl={elementContainer.current as unknown as HTMLDivElement}
            maxFiles={data.maxFiles}
          />
        </Suspense>

        <Stack
          component='div'
          sx={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <IconButton
            variant='plain'
            color='neutral'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={toggleShowDropZoneArea}
          >
            <AddPhotoAlternateIcon
              sx={{
                cursor: 'pointer',
                opacity: error ? '100%' : '60%',
                color: error ? '#ff9d9d' : 'initial',
                margin: 0
              }}
            />
          </IconButton>
        </Stack>
      </Box>
    </Tooltip>
  )
}

export default DropZone



