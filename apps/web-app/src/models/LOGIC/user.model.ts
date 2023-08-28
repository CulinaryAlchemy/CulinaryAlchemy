export interface IUser {
  username: string
  name?: string
  id: number
  email: string
  avatar?: File | string
  header?: File | string
  description?: string
  location?: string
  role: IRole
  roleId: number
  dietaryPreferences?: string
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
