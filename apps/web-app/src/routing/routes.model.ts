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
      test: {
        absolute: BaseRoutes.settings + '/test',
        relative: 'test'
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
      update: '/user/id/'
    }

  }

  const Dynamic = {
    user: {
      get (userName: string) {
        return `/user/username/${userName}`
      },
      update (userId: number) {
        return `/user/id/${userId}`
      }
    }
  } as const

  return { Static, Dynamic }
}

export const CFrontRoutes = getFrontendRoutes()
export const CBackRoutes = getBackendRoutes()
