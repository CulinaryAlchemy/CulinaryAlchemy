type THttpCodes = Record<number, string>

export const getValidationError = (code: number) => {
  const httpCodes: THttpCodes = {
    403: 'Wrong Email or Password',
    404: 'Not Found or Bad credentials',
    200: 'OK',
    201: 'Created',
    400: 'Bad request or User registered',
    409: 'Username or email already exists'
  }

  return httpCodes[code]
}
