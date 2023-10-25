import { PublicationBox } from '@/components'
import { useRecipeMethods } from '@/hooks'
import { type IRecipe } from '@/models/LOGIC'
import { type TImageFileOptimizedArray } from '@/models/UI'
import { homeInputsArrayFooter, homeInputsArrayMain, homeInputsArrayOptionals, homeInputsSchema } from '@/pages/Home/models'
import { optimizeImage } from '@/utils'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'
import { Suspense, lazy, useState } from 'react'
import { globalLoadingInstance } from './GlobalLoading/services'

const Modal = lazy(() => import('@/components/Modal/Modal'))

const AddRecipe = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { createRecipe } = useRecipeMethods()

  const handleOnSubmit = async (data: unknown) => {
    let newUserData = data as IRecipe

    const images: TImageFileOptimizedArray = []

    for (const image of newUserData['images-dropzone']!) {
      const data = await optimizeImage(image, 400, 598, () => { })
      if (data != null) {
        images.push({ src: data.imageProcessedFile, srcBlurPlaceholder: data.imageBlur })
      }
    }

    newUserData = {
      ...newUserData,
      user_id: 1,
      image_1: images[0]?.src,
      image_1_blur: images[0]?.srcBlurPlaceholder,
      image_2: images[1]?.src,
      image_2_blur: images[1]?.srcBlurPlaceholder,
      image_3: images[2]?.src,
      image_3_blur: images[2]?.srcBlurPlaceholder,
      'images-dropzone': null
    }

    try {
      globalLoadingInstance.sendMessage()
      await createRecipe(newUserData)
    } catch (e) {} finally {
      globalLoadingInstance.sendMessage()
    }
  }

  const handleOnClickModal = () => {
    setIsModalVisible((prevState) => !prevState)
  }

  return (
    <header>
      <Box
        sx={{
          position: 'fixed',
          bottom: '0.5em',
          right: '0.5em',
          zIndex: 1000
        }}
      >
        <IconButton variant='soft' color='neutral' onClick={handleOnClickModal}>
          <AddIcon />
        </IconButton>
      </Box>
      <Suspense>
        {
          isModalVisible &&
          <Modal
            title='Publish a recipe'
            open
            handleOnClickModal={handleOnClickModal}
            showDividers={false}
            styles={{
              layout: 'fullscreen'
            }}
          >
            <PublicationBox
              onSubmit={handleOnSubmit}
              inputsDataMain={homeInputsArrayMain}
              inputsDataOptionals={homeInputsArrayOptionals}
              inputsDataFooter={homeInputsArrayFooter}
              schema={homeInputsSchema}
            />
          </Modal>
        }
      </Suspense>
    </header>
  )
}

export default AddRecipe
