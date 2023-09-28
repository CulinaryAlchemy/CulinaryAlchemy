import { Header } from '@/components'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
        <>
            <Header />
            <Outlet />
        </>
  )
}

export default AppLayout
