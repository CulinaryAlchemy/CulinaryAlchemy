import { Header } from '@/components'
import { AuthGuard, CFrontRoutes } from '@/routing'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'


const LoginPage = lazy(() => import('@/pages/Login/Login'))
const HomePage = lazy(() => import('@/pages/Home/Home'))
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFound'))
const RegisterPage = lazy(() => import('@/pages/Register/Register'))
const UserPage = lazy(() => import('@/pages/User/User'))
const SettingsPage = lazy(() => import('@/pages/Settings/Settings'))
const RecipePage = lazy(() => import('@/pages/Recipe/RecipePage'))

export const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route path={CFrontRoutes.Static.base} element={<Navigate to={CFrontRoutes.Static.home} />} />
            <Route path={CFrontRoutes.Static.home} element={<HomePage />} />
            <Route path={CFrontRoutes.Static.auth.register} element={<RegisterPage />} />
            <Route path={CFrontRoutes.Static.auth.login} element={<LoginPage />} />
            <Route path={CFrontRoutes.Static.settings.home.absolute + '/*'} element={<SettingsPage />} />
            <Route path={CFrontRoutes.Static.recipe} element={<RecipePage />} />
          </Route>
          <Route path={CFrontRoutes.Static.user} element={<UserPage />} />
          <Route path={CFrontRoutes.Static.notFound} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
