
const config = {
  baseURL: import.meta.env.VITE_BASE_URL as string, // Update this on production by add env
  localStorage: {
    auth: {
      accessToken: 'accesss23', // should be in memory and reset it with the help of api /refresh end point
      refreshToken: 'shouldn\'t be here'
    },
    user: 'user-data'
  }
} as const

export { config }

