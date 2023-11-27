const getFrontendRoutes = () => {
  const BaseRoutes = {
    user: '/',
    settings: '/settings/',
    recipe: '/recipe/',
    cooking: '/cooking/'
  } as const

  const Static = {
    base: '/',
    home: '/home',
    auth: {
      login: '/login',
      register: '/register'
    },
    user: {
      base: BaseRoutes.user,
      router: BaseRoutes.user + ':userName'
    },
    recipe: BaseRoutes.recipe + ':recipeId',
    cooking: BaseRoutes.cooking + ':recipeId',
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
      }
    }
  } as const

  const Dynamic = {
    user (userId: string) {
      return `${BaseRoutes.user}${userId}`
    },
    recipe (recipeId: string) {
      return `${BaseRoutes.recipe}${recipeId}`
    },
    cooking (recipeId: string) {
      return `${BaseRoutes.cooking}${recipeId}`
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
    recipe: {
      all: '/recipe/all'
    },
    health: '/health/live',
    dietary: {
      getAll: '/dietary/all'
    }
  } as const

  const Dynamic = {
    user: {
      get (userName: string) {
        return `/user/profile/${userName}`
      },
      getById (id: number) {
        return `/user/${id}`
      },
      update (userId: number) {
        return `/user/${userId}`
      },
      delete (userId: number) {
        return `/user/${userId}`
      },
      getRecipes (userId: number) {
        return `/user/recipes/${userId}`
      },
      addDietary (userId: number, dietaryId: number) {
        return `/user/${userId}/dietary/${dietaryId}`
      },
      removeDietary (userId: number, dietaryId: number) {
        return `/user/${userId}/dietary/${dietaryId}`
      }
    },
    role: {
      get (roleId: number) {
        return `/role/${roleId}`
      }
    },
    recipe: {
      getById (recipeId: number) {
        return `/recipe/${recipeId}`
      },
      create (userId: string) {
        return `/recipe/${userId}`
      },
      deleteById (userId: string, recipeId: string) {
        return `/recipe/${userId}/${recipeId}`
      },
      updateById (userId: string, recipeId: string) {
        return `/recipe/${userId}/${recipeId}`
      }
    },
    dietary: {
      getById (dietaryId: number) {
        return `/dietary/${dietaryId}`
      }
    }
  } as const

  return { Static, Dynamic }
}

export const CFrontRoutes = getFrontendRoutes()
export const CBackRoutes = getBackendRoutes()
