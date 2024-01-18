import { AppLink, DropdownMenuBase, Image } from '@/components'
import { useGlobalAuth, useRecipeMethods } from '@/hooks'
import { CUserRoles, type IRecipe, type IUser } from '@/models/LOGIC'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Twitter from '@mui/icons-material/Twitter'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Chip from '@mui/joy/Chip'
import Input from '@mui/joy/Input'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { Suspense, lazy, useState } from 'react'

const Modal = lazy(() => import('@/components/Modal/Modal'))

interface IProps {
  userData: IUser
  recipeData: IRecipe | null | undefined
}

export const PostHeader: React.FC<IProps> = ({ userData, recipeData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { user } = useGlobalAuth()
  const { deleteRecipe } = useRecipeMethods()

  const canDelete = user?.id === userData?.id

  const handleOnClickDeleteRecipe = () => {
    if (recipeData?.id == null) return
    void deleteRecipe(String(recipeData.id))
  }

  const handleOnClickModal = () => {
    setIsModalVisible((prevState) => !prevState)
  }

  const handleOnClickToCopyLink = () => {
    void navigator.clipboard.writeText(postURL)
  }

  const postURL = `https://culinary-alchemy-web-app.vercel.app/recipe/${recipeData?.id ?? ''}`

  return (
    <Box
      component="header"
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
      <Sheet
        sx={{
          width: '2.5em',
          height: '2.5em',
          borderRadius: '100%',
          overflow: 'hidden'
        }}
      >
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
      <Stack flexGrow={1} direction="row" alignItems="center">
        <Stack flexGrow={1} alignItems="start">
          <AppLink
            sx={{
              color:
                'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))',
              textDecorationColor: 'inherit',
              fontWeight: 600
            }}
            color="neutral"
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
      <DropdownMenuBase triggerIcon={<MoreVertIcon />}>
        <DropdownMenuBase.Item onClick={handleOnClickModal}>
          <Typography
            color="primary"
            level="body2"
          >
            Share
          </Typography>
        </DropdownMenuBase.Item>
        {canDelete && (
          <DropdownMenuBase.Item onClick={handleOnClickDeleteRecipe}>
            <Typography color="danger" level="body2">
              Delete
            </Typography>
          </DropdownMenuBase.Item>
        )}
        {user == null && (
          <Typography
            sx={{
              fontSize:
                'var(--Typography-fontSize, var(--joy-fontSize-sm, 0.875rem))',
              textWrap: 'balance',
              color:
                'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))',
              padding: '0.7em'
            }}
          >
            You need to sign up to check this out
          </Typography>
        )}
      </DropdownMenuBase>
      <Suspense>
        {
          isModalVisible &&
          <Modal
            title='Share recipe'
            open
            handleOnClickModal={handleOnClickModal}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '0.4rem',
                justifyContent: 'center',
                padding: '1rem',
                paddingBottom: '0.5rem'
              }}
            >
              <a
                href={`https://twitter.com/intent/tweet?text=Peek this recipe "${recipeData?.title ?? ''}", by ${userData.username ?? ''}&url=${postURL}`}
                target='_blank'
              >
                <Twitter
                  sx={{
                    fontSize: '2rem'
                  }}
                />
              </a>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                maxWidth: '55em',
                width: '100%'
              }}
            >
              <Input
                sx={{
                  flexGrow: 1
                }}
                size='sm'
                value={postURL}
                readOnly
              />
              <Button
                onClick={handleOnClickToCopyLink}
                color='neutral'
                variant='outlined'
                size='sm'
              >
                Copy
              </Button>
            </Box>
          </Modal>
        }
      </Suspense>
    </Box>
  )
}
