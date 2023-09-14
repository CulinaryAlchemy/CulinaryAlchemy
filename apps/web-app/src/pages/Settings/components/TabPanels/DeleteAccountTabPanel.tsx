import { List, TabPanel } from '@/components'
import { useGlobalAuth, useTranslation, useUserMethods } from '@/hooks'
import { CTabsDataAccountTabPanel } from '@/pages/Settings/models/UI'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { lazy, useState } from 'react'

const Modal = lazy(() => import('@/components/Modal/Modal'))

const DeleteAccountTabPanel = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { user, signOut } = useGlobalAuth()
  const { deleteUser } = useUserMethods()

  const handleOnClickModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleOnClickAccept = () => {
    void deleteUser(user?.id as number)
      .then(() => {
        signOut()
      })
  }

  return (
        <TabPanel
            routingBy='routingSystem'
            value={CTabsDataAccountTabPanel.deactivate.name}
            loading={false}
            title={CTabsDataAccountTabPanel.deactivate.traduction}
            description={CTabsDataAccountTabPanel.deactivate.description}
            showBackNavigation={true}
        >
            <Box sx={{ padding: '0 1em 1em 1em', display: 'flex', flexDirection: 'column', gap: '1em' }}>
                <main>
                    <section>
                        <List
                            items={
                                [
                                    <Typography level='body3'>{t('deleAccount info 1 message')}</Typography>,
                                    <Typography level='body3'>{t('deleAccount info 2 message')}</Typography>,
                                    <Typography level='body3'>{t('deleAccount info 3 message')}</Typography>
                                ]
                            }
                        />
                    </section>
                </main>
                <footer>
                    <Stack direction='row' justifyContent='right'>
                        <Button onClick={handleOnClickModal} size='md' variant='outlined' color='warning'>Delete account</Button>
                    </Stack>
                </footer>
            </Box>
            {
                isModalOpen &&
                <Modal
                    open={isModalOpen}
                    handleOnClickModal={handleOnClickModal}
                    onAccept={handleOnClickAccept}
                    title={t('are you sure?')}
                    text={t('deleAccountModal message')}
                    styles={{
                      maxWidth: '25em',
                      buttonColor: 'danger'
                    }}
                    buttonAcceptText={t('delete account')}
                />
            }
        </TabPanel>
  )
}

export default DeleteAccountTabPanel
