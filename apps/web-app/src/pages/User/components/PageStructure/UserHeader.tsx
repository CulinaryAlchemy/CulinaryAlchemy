import { lazy, useState } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Chip from '@mui/joy/Chip'
import { type IUser } from '@/models/LOGIC'
import IconButton from '@mui/joy/IconButton'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'

import { Image } from '@/components'
import { useTranslation } from '@/hooks'

const AccountInformationTabPanel = lazy(
  () =>
    import('@/pages/Settings/components/TabPanels/AccountInformationTabPanel')
)
const Modal = lazy(() => import('@/components/Modal/Modal'))

interface IProps {
  data: IUser | undefined
  isOwner: boolean
}

export const UserHeader: React.FC<IProps> = ({ data, isOwner }) => {
  return (
    <header>
      <Box
        sx={{
          height: '10em',
          backgroundColor: 'var(--joy-palette-neutral-outlinedBorder)',
          overflow: 'hidden'
        }}
      >
        <Image
          src={data?.header as unknown as string}
          srcBlurPlaceholder={data?.headerBlur as string}
          alt="wallpaper image"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '10em',
            aspectRatio: '4 / 1'
          }}
        />
      </Box>
      <Stack sx={{ paddingX: '1em', paddingY: '0.5em' }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', paddingTop: '0.1em' }}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Sheet
              variant="outlined"
              sx={{
                width: '8.34375em',
                height: '8.34375em',
                borderRadius: '100%',
                border: '0.125em solid var(--joy-palette-background-surface)',
                backgroundColor: 'black',
                marginTop: '-5em !important',
                overflow: 'hidden'
              }}
            >
              <Image
                src={data?.avatar as unknown as string}
                srcBlurPlaceholder={data?.avatarBlur as string}
                alt="logo image"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </Sheet>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            {isOwner ? <HeaderButtonsOwner /> : <HeaderButtonsDefault />}
          </Stack>
        </Stack>
        <Stack spacing={1} mt={1}>
          <Stack direction="row" sx={{ gap: '0.4em', alignItems: 'center' }}>
            <Stack>
              <Stack direction={'row'} sx={{ gap: '0.4em' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.25em' }}>
                  {data?.name ?? data?.username}
                </Typography>
                {data?.role?.name && (
                  <Chip
                    size="sm"
                    variant="outlined"
                    sx={{
                      borderRadius: '0.7em'
                    }}
                  >
                    {data.role?.name}
                  </Chip>
                )}
              </Stack>
              <Typography
                sx={{
                  fontSize: '0.938em',
                  color:
                    'var(--joy-palette-text-secondary, var(--joy-palette-neutral-600, #5A5A72));'
                }}
              >
                @{data?.username}
              </Typography>
            </Stack>
          </Stack>
          <Typography
            level="body1"
            sx={{ maxHeight: '4.7em', overflow: 'hidden', fontSize: '0.938em' }}
          >
            {data?.description != null ? data.description : ''}
          </Typography>
          {data?.location && (
            <Stack direction="row" spacing={1} justifyContent="left">
              <PlaceOutlinedIcon sx={{ color: '#b9b9c6' }} />
              <Typography level="body2">{data?.location}</Typography>
            </Stack>
          )}
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
        showDividers={false}
        styles={{
          buttonColor: 'neutral',
          maxWidth: '38em',
          width: '100%',
          maxHeight: '85vh'
        }}
      >
        <AccountInformationTabPanel
          showBackNavigation={false}
          showHeaders={false}
        />
      </Modal>
      <Button variant="outlined" color="neutral" onClick={handleOnClick}>
        {t('edit profile')}
      </Button>
    </>
  )
}

export const HeaderButtonsDefault = () => {
  const { t } = useTranslation()
  return (
    <>
      <IconButton variant="outlined" color="neutral">
        <MoreVertIcon />
      </IconButton>
      <IconButton variant="outlined" color="neutral">
        <MailOutlineIcon />
      </IconButton>
      <Button variant="outlined" color="neutral">
        {t('follow')}
      </Button>
    </>
  )
}
