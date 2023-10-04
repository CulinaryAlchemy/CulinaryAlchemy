/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { PublicationBox } from '@/components'
import { useRecipeMethods } from '@/hooks'
import { type IRecipe } from '@/models/LOGIC'
import { homeInputsArrayFooter, homeInputsArrayMain, homeInputsSchema } from '@/pages/Home/models'
import { loggerInstance } from '@/services'

export const HomeHeader = () => {
  const { createRecipe } = useRecipeMethods()

  const handleOnSubmit = async (data: unknown) => {
    let newUserData = data as IRecipe

    // @ts-expect-error testing
    const image = await convertToBase64(data?.['images-dropzone'][0]) as string
    // @ts-expect-error testing
    const image2 = await convertToBase64(data?.['images-dropzone'][1]) as string
    // @ts-expect-error testing
    const image3 = await convertToBase64(data?.['images-dropzone'][2]) as string
    // @ts-expect-error testing
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const image4 = await convertToBase64(data?.['images-dropzone'][3]) as string

    // @ts-expect-error testing
    delete newUserData['images-dropzone']

    newUserData = {
      ...newUserData,
      user_id: 1,
      image_1: image,
      image_1_blur: image,
      image_2: image2,
      image_2_blur: image2,
      image_3: image3,
      image_3_blur: image3
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
        inputsDataFooter={homeInputsArrayFooter}
        schema={homeInputsSchema}
      />
    </header>
  )
}
