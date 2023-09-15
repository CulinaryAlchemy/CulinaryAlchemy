import { useNavigate } from 'react-router-dom'

export const useRouting = () => {
  const navigate = useNavigate()

  const backToLastPage = () => {
    navigate(-1)
  }

  const to = (route: string) => {
    navigate(route)
  }

  return { backToLastPage, to }
}
