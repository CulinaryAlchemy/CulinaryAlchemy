import { CFrontRoutes } from '@/routing'
import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const AccountTabPanel = lazy(() => import('@/pages/Settings/components/TabPanels/AccountTabPanel'))

export const SettingsRouting = () => {
  return (
        <Suspense>
            <Routes>
                <Route path={CFrontRoutes.Static.settings.account.relative} element={<AccountTabPanel />} />
            </Routes>
        </Suspense>
  )
}
