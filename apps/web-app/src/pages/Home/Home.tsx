import { DefaultLayout, GlobalLayout } from '@/layouts'
import { HomeMain } from '@/pages/Home/components/'
import { metadata } from './config'

const Index = () => {
  return (
    <GlobalLayout newTitle={metadata.title}>
      <DefaultLayout>
        <HomeMain />
      </DefaultLayout>
    </GlobalLayout>
  )
}

export default Index
