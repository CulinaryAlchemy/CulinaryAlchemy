import { useNavigate } from 'react-router-dom'

export const useRouting = () => {
  const navigate = useNavigate()

  const backToLastPage = () => {
    navigate(-1)
  }

  return { backToLastPage }
}
