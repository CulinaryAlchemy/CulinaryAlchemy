import { useToggleTranslation, useTranslation } from '@/hooks/'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import Sheet from '@mui/joy/Sheet'

export const ToggleTranslation = () => {
  const { t } = useTranslation()
  const { language, toggleTranslation } = useToggleTranslation()

  const handleOnClick = () => {
    toggleTranslation()
  }

  return (
    <ListItem
      role="none"
      endAction={
          <Sheet variant='outlined' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.375em', height: '1.75em', borderRadius: '0.4em' }}>
            {language}
          </Sheet>
      }
    >
      <ListItemButton onClick={handleOnClick} role="menuitem">
        {t('language')}
      </ListItemButton>
    </ListItem>
  )
}
