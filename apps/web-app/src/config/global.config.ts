
export const globalConfig = {
  baseURL: {
    frontend: 'http://localhost:5173',
    backend: import.meta.env.VITE_BACK_BASE_URL as string || 'https://culinaryalchemy.onrender.com' // Update this on production by add env
  },
  localStorage: {
    auth: {
      accessToken: 'accesss23', // should be in memory and reset it with the help of api /refresh end point
      refreshToken: 'shouldn\'t be here',
      storageMethod: 'storageMethod'
    },
    user: 'user-data',
    language: 'language'
  },
  image: {
    maxSizeBytes: 200000
  }
} as const

