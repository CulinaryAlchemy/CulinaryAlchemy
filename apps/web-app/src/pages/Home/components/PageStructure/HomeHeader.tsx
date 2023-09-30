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

    newUserData.description = 'teeest'
    newUserData.steps = 'hola como vamos'
    newUserData.cooking_time = 20

    // @ts-expect-error testing
    const image = await convertToBase64(data?.['images-dropzone'][0])

    newUserData = {
      user_id: 1,
      title: 'Recipe title',
      description: 'A description for the recipe.',
      // @ts-expect-error testing
      image_1: image,
      image_1_blur: image,
      image_2: image,
      image_2_blur: image,
      image_3: image,
      image_3_blur: image
    }

    loggerInstance.log('HomeHeader.tsx', { data, newUserData })
    createRecipe(newUserData)
  }

  const convertToBase64 = async (file: File) => {
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
