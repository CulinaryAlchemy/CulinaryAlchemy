import { DefaultLayout, GlobalLayout } from '@/layouts'
import { lazy } from 'react'
import { metadata } from './config'

const RecipesTabPanel = lazy(() => import('@/pages/Home/components/TabPanels/RecipesTabPanel'))

const Index = () => {
  return (
    <GlobalLayout newTitle={metadata.title}>
      <DefaultLayout>
        <RecipesTabPanel />
      </DefaultLayout>
    </GlobalLayout>
  )
}

export default Index
