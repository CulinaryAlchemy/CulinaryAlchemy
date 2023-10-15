import { Loading } from '@/components'
import { optimizeImage, toastUtils } from '@/utils'
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
  onSuccess: (fileData: File, fileBlurData: File) => Promise<unknown>
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
    const data = await optimizeImage(event?.target?.files[0], height, width, () => { setIsLoading(false) })

    if (data == null) return

    const { imageBlur, imageProcessedFile } = data

    onSuccess(imageProcessedFile, imageBlur)
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
                opacity: '60%',
                color: 'rgb(216, 216, 223)'
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
