import { useNavigate } from 'react-router-dom'

export const useRouting = () => {
  const navigate = useNavigate()

  const backToLastPage = () => {
    navigate(-1)
  }

  const goto = (route: string) => {
    navigate(route)
  }

  return { backToLastPage, goto }
}
