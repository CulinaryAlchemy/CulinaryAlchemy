import { Header } from '@/components'
import { useGlobalAuth } from '@/hooks'
import { lazy } from 'react'
import { Outlet } from 'react-router-dom'

const AddRecipe = lazy(() => import('@/components/AddRecipe'))

const AppLayout = () => {
  const { user } = useGlobalAuth()
  return (
        <>
            <Header />
            {user != null && <AddRecipe />}
            <Outlet />
        </>
  )
}

export default AppLayout
