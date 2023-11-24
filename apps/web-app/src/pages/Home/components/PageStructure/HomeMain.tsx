import { useReRenderPage } from '@/hooks'
import { Recipes } from '@/pages/Home/components/'

export const HomeMain = () => {
  const { reRender } = useReRenderPage()
  return (
        <div key={reRender}>
            <Recipes />
        </div>
  )
}
