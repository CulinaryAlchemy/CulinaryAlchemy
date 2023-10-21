import { AddRecipe, Header } from '@/components'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
        <>
            <Header />
            <AddRecipe />
            <Outlet />
        </>
  )
}

export default AppLayout
