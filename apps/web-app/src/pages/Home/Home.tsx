import { GlobalLayout } from '@/layouts'
import { metadata } from './config'

const Index = () => {
  return (
    <GlobalLayout newTitle={metadata.title}>
      <h1>Index</h1>
    </GlobalLayout>
  )
}

export default Index
