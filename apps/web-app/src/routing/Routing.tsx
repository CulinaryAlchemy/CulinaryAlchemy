import { Header } from '@/components'
import { AuthGuard, frontRoutes } from '@/routing'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


const LoginPage = lazy(() => import('@/pages/Login/Login'))
const IndexPage = lazy(() => import('@/pages/Index/Index'))
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFound'))
const RegisterPage = lazy(() => import('@/pages/Register/Register'))
const UserPage = lazy(() => import('@/pages/User/User'))
const SettingsPage = lazy(() => import('@/pages/Settings/Settings'))

export const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route path={frontRoutes.Static.index} element={<IndexPage />} />
            <Route path={frontRoutes.Static.auth.register} element={<RegisterPage />} />
            <Route path={frontRoutes.Static.auth.login} element={<LoginPage />} />
            <Route path={frontRoutes.Static.settings} element={<SettingsPage />} />
          </Route>
          <Route path={frontRoutes.Static.user} element={<UserPage />} />
          <Route path={frontRoutes.Static.notFound} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
