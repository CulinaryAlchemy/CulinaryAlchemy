
import { AuthGuard, CFrontRoutes, SuspenseRouter } from '@/routing'
import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const AppLayout = lazy(() => import('@/layouts/AppLayout/AppLayout'))
const HomePage = lazy(() => import('@/pages/Home/Home'))
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFound'))
const LoginPage = lazy(() => import('@/pages/Login/Login'))
const RegisterPage = lazy(() => import('@/pages/Register/Register'))
const UserPage = lazy(() => import('@/pages/User/User'))
const SettingsPage = lazy(() => import('@/pages/Settings/Settings'))
const RecipePage = lazy(() => import('@/pages/Recipe/RecipePage'))
const CookingPage = lazy(() => import('@/pages/Cooking/Cooking'))
const AuthLayout = lazy(() => import('@/layouts/AuthLayout/AuthLayout'))

export const Routing = () => {
  return (
    <SuspenseRouter window={window}>
      <Suspense>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route element={<AuthLayout showBackground />}>
              <Route path={CFrontRoutes.Static.auth.register} element={<RegisterPage />} />
              <Route path={CFrontRoutes.Static.auth.login} element={<LoginPage />} />
            </Route>
            <Route element={<AppLayout />}>
              <Route path={CFrontRoutes.Static.base} element={<Navigate to={CFrontRoutes.Static.home} />} />
              <Route path={CFrontRoutes.Static.home} element={<HomePage />} />
              <Route path={CFrontRoutes.Static.settings.home.absolute + '/*'} element={<SettingsPage />} />
              <Route path={CFrontRoutes.Static.recipe} element={<RecipePage />} />
              <Route path={CFrontRoutes.Static.cooking} element={<CookingPage />} />
              <Route path={CFrontRoutes.Static.user} element={<UserPage />} />
              <Route path={CFrontRoutes.Static.notFound} element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </SuspenseRouter>
  )
}
