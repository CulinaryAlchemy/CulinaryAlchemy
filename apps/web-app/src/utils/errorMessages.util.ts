type THttpCodes = Record<number, string>

export const getValidationError = (code: number) => {
  const httpCodes: THttpCodes = {
    403: 'Wrong Email or Password',
    200: 'OK',
    201: 'Created'
  }

  return httpCodes[code]
}
