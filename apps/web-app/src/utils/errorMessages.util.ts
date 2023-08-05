type THttpCodes = Record<number, string>

export const getValidationError = (code: number) => {
  const httpCodes: THttpCodes = {
    403: 'Wrong Email or Password',
    404: 'Not Found',
    200: 'OK',
    201: 'Created',
    400: 'Bad request'
  }

  return httpCodes[code]
}
