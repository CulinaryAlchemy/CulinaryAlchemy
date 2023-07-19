import { useEffect } from 'react'

interface IProps {
  newTitle: string
  children: React.ReactNode
}
export const GlobalLayout: React.FC<IProps> = ({ newTitle, children }) => {
  useEffect(() => {
    document.title = newTitle
  }, [])

  return (children)
}
