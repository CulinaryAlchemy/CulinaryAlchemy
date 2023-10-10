import { DefaultLayout, GlobalLayout } from '@/layouts'
import { HomeHeader, HomeMain } from '@/pages/Home/components/'
import { metadata } from './config'

const Index = () => {
  return (
    <GlobalLayout newTitle={metadata.title}>
      <DefaultLayout>
        <HomeHeader />
        <HomeMain />
      </DefaultLayout>
    </GlobalLayout>
  )
}

export default Index
