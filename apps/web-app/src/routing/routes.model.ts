const getFrontendRoutes = () => {
  const BaseRoutes = {
    user: '/'
  } as const

  const Static = {
    index: '/',
    auth: {
      login: '/login',
      register: '/register'
    },
    user: BaseRoutes.user + ':userName',
    notFound: '*'
  }

  const Dynamic = {
    user (id: string) {
      return `${BaseRoutes.user}${id}`
    }
  } as const

  return { Static, Dynamic }
}

const getBackendRoutes = () => {
  const Static = {
    auth: {
      signup: '/auth/sign-up',
      signin: '/auth/sign-in'
    }

  }

  const Dynamic = {
    user (userName: string) {
      return `/user/username/${userName}`
    }
  } as const

  return { Static, Dynamic }
}

export const frontRoutes = getFrontendRoutes()
export const backRoutes = getBackendRoutes()
