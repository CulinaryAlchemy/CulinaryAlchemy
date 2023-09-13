const getFrontendRoutes = () => {
  const BaseRoutes = {
    user: '/',
    settings: '/settings/',
    recipe: '/recipe/'
  } as const

  const Static = {
    base: '/',
    home: '/home',
    auth: {
      login: '/login',
      register: '/register'
    },
    user: BaseRoutes.user + ':userName',
    recipe: BaseRoutes.recipe + ':recipeId',
    notFound: '*',
    settings: {
      home: {
        absolute: BaseRoutes.settings
      },
      account: {
        absolute: BaseRoutes.settings + 'account',
        relative: 'account'
      },
      information: {
        absolute: BaseRoutes.settings + 'information',
        relative: 'information'
      },
      deactivate: {
        absolute: BaseRoutes.settings + 'deactivate',
        relative: 'deactivate'
      },
      dietaryPreferences: {
        absolute: BaseRoutes.settings + 'dietaryPreferences',
        relative: 'dietaryPreferences'
      }
    }
  }

  const Dynamic = {
    user (userId: string) {
      return `${BaseRoutes.user}${userId}`
    },
    recipe (recipeId: string) {
      return `${BaseRoutes.recipe}${recipeId}`
    }
  } as const

  return { Static, Dynamic }
}

const getBackendRoutes = () => {
  const Static = {
    auth: {
      signup: '/auth/sign-up',
      signin: '/auth/sign-in',
      check: {
        accessToken: '/token/check'
      }
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
    },
    role: {
      get (roleId: number) {
        return `/role/${roleId}`
      }
    }
  } as const

  return { Static, Dynamic }
}

export const CFrontRoutes = getFrontendRoutes()
export const CBackRoutes = getBackendRoutes()
