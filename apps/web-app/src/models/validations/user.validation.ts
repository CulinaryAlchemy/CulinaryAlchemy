import { z as zValidator } from 'zod'

export const CUserValidations = {
  username: zValidator.string().min(3).refine((value) => value === value.toLowerCase(), { message: 'String must be in lower case' }),
  email: zValidator.string().email().min(4).max(254),
  password: zValidator.string().min(12).max(60)
}
