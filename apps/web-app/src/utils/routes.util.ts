import { CFrontRoutes } from '@/routing'

export const isValidUserRoute = (pathname: string) => {
  pathname = parseRoute(pathname)
  const routesNotAllowed = [CFrontRoutes.Static.home, CFrontRoutes.Static.settings.home.absolute]

  const routesNotAllowedParsed = routesNotAllowed.map((route) => {
    return parseRoute(route)
  })

  const isARouteNotAllowed = !routesNotAllowedParsed.includes(pathname)
  const isAUserRoute = pathname.split(CFrontRoutes.Static.user.base).length === 2

  return isAUserRoute && isARouteNotAllowed
}

const parseRoute = (pathname: string) => {
  if (pathname.at(-1) === '/') {
    pathname = pathname.slice(0, pathname.length - 1)
  }
  return pathname
}
