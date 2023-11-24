import { useLocation, useNavigate } from 'react-router-dom'

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
    import('@/services/reRenderPage.service')
      .then((module) => {
        module.reRenderPageService.sendMessage()
      })
      .catch(() => {
        console.error('useRouting: Something went wrong with dynamic imports of refresh method')
      })
  }

  const getActualPath = () => {
    return path
  }

  return { backToLastPage, goto, refresh, getActualPath }
}
