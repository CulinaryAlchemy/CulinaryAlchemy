import { TabPanel } from '@/components'
import { useTranslation } from '@/hooks'
import { CTabsData } from '@/pages/Settings/models/UI'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

const HomeTabPanel = () => {
  const { t } = useTranslation()
  return (
    <TabPanel routingBy='routingSystem' value={CTabsData.home.name} loading={false}>
      <Stack
        alignItems='center'
        justifyContent='center'
        height='100%'
        padding='1em'
      >
        <header>
          <Typography level='h2' sx={{ textWrap: 'balance', textAlign: 'center' }}>
            {t('welcome to settings page')}
          </Typography>
        </header>
        <main>
          <Typography
            sx={{
              color: 'var(--joy-palette-text-tertiary, var(--joy-palette-neutral-500, #73738C))',
              lineHeight: 'var(--joy-lineHeight-md, 1.5)',
              fontSize: 'var(--Typography-fontSize, var(--joy-fontSize-xs, 0.75rem))',
              textWrap: 'balance',
              textAlign: 'center'
            }}>
            {t('settings default message')}
          </Typography>
        </main>
      </Stack>
    </TabPanel>
  )
}

export default HomeTabPanel
