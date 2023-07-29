const BaseRoutes = {
  user: '/'
} as const

export const CStaticRoutes = {
  index: '/',
  login: '/login',
  register: '/register',
  user: BaseRoutes.user + ':userName',
  notFound: '*'
} as const

export const CDynamicRoutes = {
  user (id: string) {
    return `${BaseRoutes.user}${id}`
  }
} as const
