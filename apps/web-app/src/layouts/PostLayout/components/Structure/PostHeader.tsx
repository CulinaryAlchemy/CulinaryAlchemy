import { AppLink, DropdownMenuBase, Image } from '@/components'
import { useGlobalAuth, useRecipeMethods } from '@/hooks'
import { CUserRoles, type IUser } from '@/models/LOGIC'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/joy/Box'
import Chip from '@mui/joy/Chip'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

interface IProps {
  userData: IUser
  recipeId: string
}

export const PostHeader: React.FC<IProps> = ({ userData, recipeId }) => {
  const { user } = useGlobalAuth()
  const { deleteRecipe } = useRecipeMethods()

  const canDelete = user?.id === userData.id
  const canReport = user != null

  const handleOnClickDeleteRecipe = () => {
    void deleteRecipe(recipeId)
  }

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
      <DropdownMenuBase
        triggerIcon={
          <MoreVertIcon />
        }
      >

        {
          canDelete &&
          <DropdownMenuBase.Item onClick={handleOnClickDeleteRecipe}>
            <Typography color='danger' level='body2'>
              Delete
            </Typography>
          </DropdownMenuBase.Item>
        }
        {
          canReport &&
          <DropdownMenuBase.Item>
            <Typography color='warning' level='body2'>
              Report
            </Typography>
          </DropdownMenuBase.Item>
        }
        {
          user == null && <Typography sx={{ fontSize: 'var(--Typography-fontSize, var(--joy-fontSize-sm, 0.875rem))', textWrap: 'balance', color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))', padding: '0.7em' }}>You need to sign up to check this out</Typography>
        }
      </DropdownMenuBase>
    </Box>
  )
}
