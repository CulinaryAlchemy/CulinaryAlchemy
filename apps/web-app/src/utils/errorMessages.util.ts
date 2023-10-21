type THttpCodes = Record<string, string>

export const getValidationError = (code: string) => {
  const CustomMessageCodes: THttpCodes = {
    LOGIN_SUCCES: 'Login successful',
    LOGIN_DENIED: 'Login denied',
    REGISER_SUCCES: 'Registration successful',
    REGISER_DENIED: 'Registration denied',
    // USER_FOUND: 'User found',
    USER_NOT_FOUND: 'User not found',
    USERS_NOT_FOUND: 'Users not found',
    ROLE_NOT_FOUND: 'Role not found',
    DATA_UPDATED: 'Data updated',
    SESSION_EXPIRED: 'Session expired',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    ACCOUNT_DESACTIVATED: 'Account deactivated',
    SERVER_IS_ON: 'Server is online',
    SERVER_IS_OFF: 'Server is offline',
    TOKEN_NOT_FOUND: 'TOKEN NOT FOUND'
    // 'Bad request': 'Bad request'
    // RECIPES_FOUND: 'RECIPES FOUND'
  }

  return CustomMessageCodes[code]
}
