import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const AccountTabPanel = lazy(() => import('@/pages/Settings/components/TabPanels/AccountTabPanel'))
const HomeTabPanel = lazy(() => import('@/pages/Settings/components/TabPanels/HomeTabPanel'))

export const SettingsRouting = () => {
  return (
        <Suspense>
            <Routes>
                <Route path='account' element={<AccountTabPanel />} />
                <Route path='*' element={<HomeTabPanel />} />
            </Routes>
        </Suspense>
  )
}
