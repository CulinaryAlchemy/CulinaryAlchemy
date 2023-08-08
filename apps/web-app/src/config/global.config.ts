
const config = {
  baseURL: {
    frontend: 'http://localhost:5173',
    backend: import.meta.env.VITE_BACK_BASE_URL as string || 'http://localhost:3000' // Update this on production by add env
  },
  localStorage: {
    auth: {
      accessToken: 'accesss23', // should be in memory and reset it with the help of api /refresh end point
      refreshToken: 'shouldn\'t be here'
    },
    user: 'user-data',
    language: 'language'
  }
} as const

console.log(config.baseURL.frontend)

export { config }

