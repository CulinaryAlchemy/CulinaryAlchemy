import { AppLink, Image } from '@/components'
import { CUserRoles, type IUser } from '@/models/LOGIC'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/joy/Box'
import Chip from '@mui/joy/Chip'
import IconButton from '@mui/joy/IconButton'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'

interface IProps {
  userData: IUser
}

export const PostHeader: React.FC<IProps> = ({ userData }) => {
  return (
    <Box
      component='header'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '0.4em',
        justifyContent: 'space-between',
        paddingInline: '1em',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Sheet sx={{ width: '2.5em', height: '2.5em', borderRadius: '100%', overflow: 'hidden' }}>
        <Image
          src={userData.avatar as string}
          srcBlurPlaceholder={userData.avatarBlur as string}
          alt="user image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Sheet>
      <Stack flexGrow={1} direction='row' alignItems='center'>
        <Stack flexGrow={1} alignItems='start'>
          <AppLink
            level='body1'
            sx={{
              color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))',
              textDecorationColor: 'inherit',
              fontWeight: 600
            }}
            color='neutral'
            to={`/${userData?.username}`}
          >
            {userData?.username}
          </AppLink>
          {userData?.role?.name === CUserRoles.Admin && (
            <Chip
              size="sm"
              variant="outlined"
              sx={{
                borderRadius: '0.7em'
              }}
            >
              {userData.role?.name}
            </Chip>
          )}
        </Stack>
      </Stack>
      <IconButton
        variant='plain'
        size="sm"
        color='neutral'
        sx={{
          width: '1.171875em',
          height: '1.171875em'
        }}
      >
        <MoreVertIcon />
      </IconButton>
    </Box>
  )
}
