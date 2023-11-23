import { useNavigate, useLocation } from 'react-router-dom'

export const useRouting = () => {
  const navigate = useNavigate()
  const path = useLocation().pathname

  const backToLastPage = () => {
    navigate(-1)
  }

  const goto = (route: string) => {
    navigate(route)
  }

  const refresh = () => {
    location.reload()
  }

  const getActualPath = () => {
    return path
  }

  return { backToLastPage, goto, refresh, getActualPath }
}
