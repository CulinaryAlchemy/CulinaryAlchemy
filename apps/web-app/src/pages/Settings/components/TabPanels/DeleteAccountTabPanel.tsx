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
                                    <Typography level='body3'>Todos los datos de tu perfil, incluyendo tus publicaciones, comentarios y conexiones, serán eliminados.</Typography>,
                                    <Typography level='body3'>No podrás acceder nuevamente a esta cuenta y tendrás que crear una nueva cuenta si deseas usar nuestros servicios en el futuro.</Typography>,
                                    <Typography level='body3'>Cualquier contenido compartido con otros usuarios no estará disponible después de la eliminación de la cuenta.</Typography>
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
        </TabPanel>
  )
}

export default DeleteAccountTabPanel
