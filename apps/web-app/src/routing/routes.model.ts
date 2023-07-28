const BaseRoutes = {
  user: '/'
} as const

export const CStaticRoutes = {
  index: '/',
  login: '/login',
  register: '/register',
  user: BaseRoutes.user + ':id',
  notFound: '*'
} as const

export const CDynamicRoutes = {
  user (id: string | number) {
    return `${BaseRoutes.user}${id}`
  }
} as const
