import { useTranslation } from '@/hooks'
import { type IUser } from '@/models/LOGIC'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Chip from '@mui/joy/Chip'
import IconButton from '@mui/joy/IconButton'
import Link from '@mui/joy/Link'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { lazy, useState } from 'react'

const AccountInformationTabPanel = lazy(() => import('@/components/AppTabPanels/AccountInformationTabPanel'))
const Modal = lazy(() => import('@/components/Modal/Modal'))

interface IProps {
  data: IUser | undefined
  isOwner: boolean
}

export const UserHeader: React.FC<IProps> = ({ data, isOwner }) => {
  const { t } = useTranslation()

  return (
    <header>
      <Box sx={{ height: '10em', backgroundColor: 'var(--joy-palette-neutral-outlinedBorder)', overflow: 'hidden' }}>
        <img src="/wallpaper.webp" alt="wallpaper image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
      </Box>
      <Stack sx={{ paddingX: '1em', paddingY: '0.5em' }}>
        <Stack direction='row' sx={{ justifyContent: 'space-between', paddingTop: '0.1em' }}>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Sheet variant='outlined' sx={{ width: '8.34375em', height: '8.34375em', borderRadius: '100%', border: '0.125em solid var(--joy-palette-background-surface)', backgroundColor: 'black', marginTop: '-5em !important', overflow: 'hidden' }}>
              <img src="/logo.webp" alt="logo image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </Sheet>
            <Stack direction='row' sx={{ gap: '0.4em', alignItems: 'center' }}>
              <Typography level='h6'>{data?.username}</Typography>
              {data?.role?.name &&
                <Chip
                  size='sm'
                  variant='outlined'
                  sx={{
                    borderRadius: '0.7em'
                  }}
                >
                  {data.role?.name}
                </Chip>
              }
            </Stack>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={1}>
            {
              isOwner
                ? <HeaderButtonsOwner />
                : <HeaderButtonsDefault />
            }
          </Stack>
        </Stack>
        <Stack spacing={1} mt={1}>
          <Typography level='body2' sx={{ maxHeight: '4.7em', overflow: 'hidden', fontSize: '0.938em' }}>
            {data?.description != null ? data.description : `No ${t('description')}`}
          </Typography>
          <Stack direction='row' spacing={1} justifyContent='right'>
            <Link level='body3' href='https://www.google.com' target='_blank'>Twitter</Link>
          </Stack>
        </Stack>
      </Stack>
    </header>
  )
}

export const HeaderButtonsOwner = () => {
  const { t } = useTranslation()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOnClick = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <Modal
        open={isOpenModal}
        title={t('edit profile')}
        handleOnClickModal={handleOnClick}
        styles={{
          buttonColor: 'neutral',
          maxWidth: '28em',
          width: '100%'
        }}
      >
        <AccountInformationTabPanel
          showBackNavigation={false}
          showHeaders={false}
        />
      </Modal>
      <Button
        variant='outlined'
        color='neutral'
        onClick={handleOnClick}
      >
        {t('edit profile')}
      </Button>
    </>
  )
}

export const HeaderButtonsDefault = () => {
  const { t } = useTranslation()
  return (
    <>
      <IconButton variant='outlined' color='neutral'><MoreVertIcon /></IconButton>
      <IconButton variant='outlined' color='neutral'><MailOutlineIcon /></IconButton>
      <Button variant='outlined' color='neutral'>{t('follow')}</Button>
    </>
  )
}
