import { z as zValidator } from 'zod'

export const CUserValidations = {
  username: zValidator.string().min(3),
  email: zValidator.string().email().min(4).max(254),
  password: zValidator.string().min(12).max(60)
}
