export interface IUser {
  username: string
  name?: string
  email: string
  avatar?: string
  description?: string
  location?: string
  role: Role
  roleId: number
  dietaryPreferences?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface Role {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface IUserRegiser {
  username: string
  email: string
  password: string
}

export interface IUserSignIn {
  email: string
  password: string
}
