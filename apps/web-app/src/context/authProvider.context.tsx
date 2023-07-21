import { authContext } from '@/context'
import { useAuth } from '@/hooks'
import React from 'react'

interface IProps {
  children: React.ReactNode
}
export const AuthContextProvider: React.FC<IProps> = ({ children }) => {
  const authActions = useAuth()
  return <authContext.Provider value={{ ...authActions }}>{children}</authContext.Provider>
}
