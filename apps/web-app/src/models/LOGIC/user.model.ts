export interface IUser {
  username: string
  name?: string
  id: number
  email: string
  avatar?: FileList
  description?: string
  location?: string
  role: Role
  roleId: number
  dietaryPreferences?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  password?: string
}

export type TUserKey = keyof IUser

export interface Role {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
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
