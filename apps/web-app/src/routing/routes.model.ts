const getFrontendRoutes = () => {
  const BaseRoutes = {
    user: '/',
    settings: '/settings'
  } as const

  const Static = {
    index: '/',
    auth: {
      login: '/login',
      register: '/register'
    },
    user: BaseRoutes.user + ':userName',
    notFound: '*',
    settings: {
      home: {
        absolute: BaseRoutes.settings
      },
      account: {
        absolute: BaseRoutes.settings + '/account',
        relative: 'account'
      },
      information: {
        absolute: BaseRoutes.settings + '/information',
        relative: 'information'
      },
      deactivate: {
        absolute: BaseRoutes.settings + '/deactivate',
        relative: 'deactivate'
      }
    }
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
    },
    user: {
      update: '/user/id',
      check: {
        username: '/user/check-username',
        email: '/user/check-email'
      }
    },
    health: '/health/live'

  }

  const Dynamic = {
    user: {
      get (userName: string) {
        return `/user/profile/${userName}`
      },
      update (userId: number) {
        return `/user/${userId}`
      },
      delete (userId: number) {
        return `/user/${userId}`
      }
    }
  } as const

  return { Static, Dynamic }
}

export const CFrontRoutes = getFrontendRoutes()
export const CBackRoutes = getBackendRoutes()
