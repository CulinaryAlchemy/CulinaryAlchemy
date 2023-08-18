import { TabPanel } from '@/components'
import { useTranslation } from '@/hooks'
import { CTabsData } from '@/pages/Settings/models/UI'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

const HomeTabPanel = () => {
  const { t } = useTranslation()
  return (
    <TabPanel value={CTabsData.home.name} loading={false}>
        <Stack
          alignItems='center'
          justifyContent='center'
          height='100%'
          textAlign='center'
          padding='1em'
        >
          <header>
            <Typography level='h2' sx={{ textWrap: 'balance' }}>
              {t('welcome to settings page')}
            </Typography>
          </header>
          <main>
            <Typography level='body3' sx={{ textWrap: 'balance' }}>
              {t('settings default message')}
            </Typography>
          </main>
        </Stack>
    </TabPanel>
  )
}

export default HomeTabPanel
