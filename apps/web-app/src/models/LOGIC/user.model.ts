export interface IUser {
  username: string
  name?: string
  id: number
  email: string
  avatar?: File | string
  avatarBlur?: File | string
  header?: File | string
  headerBlur?: File | string
  description?: string
  location?: string
  role: IRole
  roleId: number
  dietaryPreferences?: number[]
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  password?: string
}

export type TUserKey = keyof IUser

export interface IRole {
  id: number
  name: string
}

export interface IUserRegister {
  username: string
  email: string
  password: string
}

export interface IUserSignIn {
  email: string
  password: string
}

export type IUserUpdate = Partial<IUser>

export const CUserRoles = {
  Admin: 'admin',
  User: 'user'
}
