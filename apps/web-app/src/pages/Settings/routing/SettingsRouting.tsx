import { Loading } from '@/components'
import { MessageLayout } from '@/layouts'
import { CFrontRoutes } from '@/routing'
import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const AccountTabPanel = lazy(() => import('@/pages/Settings/components/TabPanels/AccountTabPanel'))
const AccountInformationTabPanel = lazy(() => import('@/pages/Settings/components/TabPanels/AccountInformationTabPanel'))
const HomeTabPanel = lazy(() => import('@/pages/Settings/components/TabPanels/HomeTabPanel'))
const DeleteAccountTabPanel = lazy(() => import('@/pages/Settings/components/TabPanels/DeleteAccountTabPanel'))
const DietaryPreferencesTabPanel = lazy(() => import('@/pages/Settings/components/TabPanels/DietaryPreferencesTabPanel'))

export const SettingsRouting = () => {
  return (
        <Suspense fallback={<MessageLayout><Loading size='md'/></MessageLayout>}>
            <Routes>
                <Route path={CFrontRoutes.Static.settings.account.relative} element={<AccountTabPanel />} />
                <Route path={CFrontRoutes.Static.settings.information.relative} element={<AccountInformationTabPanel />} />
                <Route path={CFrontRoutes.Static.settings.deactivate.relative} element={<DeleteAccountTabPanel />} />
                <Route path={CFrontRoutes.Static.settings.dietaryPreferences.relative} element={<DietaryPreferencesTabPanel />} />
                <Route path='*' element={<HomeTabPanel />} />
            </Routes>
        </Suspense>
  )
}
