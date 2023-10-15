/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PublicationBox } from '@/components'
import { useRecipeMethods } from '@/hooks'
import { type IRecipe } from '@/models/LOGIC'
import { type TImageFileOptimizedArray } from '@/models/UI'
import { homeInputsArrayFooter, homeInputsArrayMain, homeInputsArrayOptionals, homeInputsSchema } from '@/pages/Home/models'
import { loggerInstance } from '@/services'
import { optimizeImage } from '@/utils'

export const HomeHeader = () => {
  const { createRecipe } = useRecipeMethods()

  const handleOnSubmit = async (data: unknown) => {
    let newUserData = data as IRecipe

    const images: TImageFileOptimizedArray = []

    Array.from(newUserData['images-dropzone']).forEach(async (image) => {
      const data = await optimizeImage(image, 400, 598, () => { })
      if (data == null) return

      images.push({ src: data.imageProcessedFile, srcBlurPlaceholder: data.imageBlur })
    })

    // @ts-expect-error testing
    delete newUserData['images-dropzone']

    newUserData = {
      ...newUserData,
      user_id: 1,
      image_1: await convertToBase64(images[0]?.src) as string,
      image_1_blur: await convertToBase64(images[0]?.srcBlurPlaceholder) as string,
      image_2: await convertToBase64(images[1]?.src) as string,
      image_2_blur: await convertToBase64(images[1]?.srcBlurPlaceholder) as string,
      image_3: await convertToBase64(images[2]?.src) as string,
      image_3_blur: await convertToBase64(images[2]?.srcBlurPlaceholder) as string
    }

    loggerInstance.log('HomeHeader.tsx', { data, newUserData })
    createRecipe(newUserData)
  }

  const convertToBase64 = async (file: File | null) => {
    if (file == null) return
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      // @ts-expect-error testing
      reader.onload = () => { resolve(reader?.result?.split(',')[1]) }
      reader.onerror = (error) => { reject(error) }
    })
  }

  return (
    <header>
      <PublicationBox
        onSubmit={handleOnSubmit}
        inputsDataMain={homeInputsArrayMain}
        inputsDataOptionals={homeInputsArrayOptionals}
        inputsDataFooter={homeInputsArrayFooter}
        schema={homeInputsSchema}
      />
    </header>
  )
}
