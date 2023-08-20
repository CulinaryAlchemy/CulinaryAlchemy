type THttpCodes = Record<number, string>

export const getValidationError = (code: number) => {
  const httpCodes: THttpCodes = {
    200: 'OK',
    201: 'Created',
    400: 'Bad request or User registered',
    401: 'Session expired or Not authorized',
    403: 'Wrong Email or Password',
    404: 'Not Found or Bad credentials',
    409: 'Username or email already exists',
    500: 'Internal server error',
    503: 'Sever is down. Wait 2 minutes. thanks <3'
  }

  return httpCodes[code]
}
