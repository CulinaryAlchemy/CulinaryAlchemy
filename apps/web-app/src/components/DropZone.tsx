import { Loading } from '@/components'
import { globalConfig } from '@/config'
import { ImageOptimizerManager, ImageValidator, toastUtils } from '@/utils'
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak'
import Box from '@mui/joy/Box'
import { useId, useState } from 'react'

interface IStyles {
  width?: string
  height?: string
  backdropFilter?: string
  backgroundColor?: string
}

interface IProps {
  styles: IStyles
  onSuccess: (fileData: File) => Promise<unknown>
  fileType?: string
  width: number
  height: number
}

export const DropZone: React.FC<IProps> = ({ fileType, styles, onSuccess, width, height }) => {
  const [isLoading, setIsLoading] = useState(false)
  const id = useId()

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0] == null) {
      toastUtils.error('File not found')
      return
    }

    setIsLoading(true)
    const file: File = event?.target?.files[0]

    const imageValidatorInstance = new ImageValidator()

    const isValidWidthAndHeight = await imageValidatorInstance.validateWidthAndHeight(
      {
        file,
        minHeight: height,
        minWidth: width
      }
    )

    if (!isValidWidthAndHeight) {
      toastUtils.error(`The image dimensions are too small. They should be at least ${width}px wide by ${height}px high.`)
      setIsLoading(false)
      return
    }

    const imageOptimizerInstance = new ImageOptimizerManager()
    const imageProcessedFile = await imageOptimizerInstance.optimizeAndResize(file, width, height)

    const isValidImageSize = imageValidatorInstance.validateSize(imageProcessedFile)

    if (!isValidImageSize) {
      toastUtils.error(`The image is too large. The maximum allowed image size is ${globalConfig.image.maxSizeBytes / 1024}KB.`)
      setIsLoading(false)
      return
    }

    onSuccess(imageProcessedFile)
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: styles.width,
        height: styles.height,
        backdropFilter: styles.backdropFilter,
        backgroundColor: styles.backgroundColor,
        zIndex: 10
      }}
    >
      {isLoading
        ? <Loading size='md' />
        : <>
            <label htmlFor={id}>
              <CenterFocusWeakIcon
                sx={{
                  cursor: 'pointer',
                  fontSize: '2.5em',
                  opacity: '60%'
                }}
              />
            </label>
            <input
              onChange={handleOnChange}
              accept={fileType}
              id={id}
              type="file"
              style={{
                display: 'none'
              }}
            />
          </>
      }
    </Box>
  )
}
