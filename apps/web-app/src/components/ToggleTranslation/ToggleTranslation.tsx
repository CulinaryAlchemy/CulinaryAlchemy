import { useToggleTranslation } from '@/hooks/useToggleTranslation'
import Button from '@mui/joy/Button'

export const ToggleTranslation = () => {
  const { language, toggleTranslation } = useToggleTranslation()

  const handleOnClick = () => {
    toggleTranslation()
  }

  return <Button onClick={handleOnClick}>{language}</Button>
}
