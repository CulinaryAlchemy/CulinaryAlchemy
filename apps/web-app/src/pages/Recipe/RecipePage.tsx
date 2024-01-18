import { Recipe } from '@/components'
import { DefaultLayout, GlobalLayout } from '@/layouts'
import { useParams } from 'react-router-dom'

const RecipePage = () => {
  const { recipeId } = useParams()

  return (
    <GlobalLayout newTitle={recipeId as string}>
      <DefaultLayout
        styles={{
          maxWidth: '60em'
        }}
      >
        <Recipe
          recipeId={Number(recipeId)}
          styles={{
            border: 'none',
            gap: '0.5em',
            content: {
              paddingInline: '1em',
              flexDirection: 'row',
              gap: '1em',
              carrousel: {
                maxWidth: '25em',
                borderRadius: '0.5em'
              },
              informationSection: {
                paddingInline: '0'
              }
            }
          }}
        />
      </DefaultLayout>
    </GlobalLayout>
  )
}

export default RecipePage
