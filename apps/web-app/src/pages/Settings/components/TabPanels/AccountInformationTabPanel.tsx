import { DropZone, Form, Image, TabPanel } from '@/components'
import { useGlobalAuth, useGlobalLoading, useTranslation, useUserMethods } from '@/hooks'
import { type IUser, type IUserUpdate } from '@/models/LOGIC'
import { CTabsDataAccountTabPanel, accountInformationInputsAccountTabSchema, accountInformationSelectedInputsArray } from '@/pages/Settings/models/UI'
import { toastUtils } from '@/utils'
import Box from '@mui/joy/Box'
import { type SubmitHandler } from 'react-hook-form'

interface IProps {
  showBackNavigation?: boolean
  showHeaders?: boolean
}

const AccountInformationTabPanel: React.FC<IProps> = ({ showBackNavigation, showHeaders }) => {
  const { t } = useTranslation()
  const { updateUser } = useUserMethods()
  const { user } = useGlobalAuth()
  const { toggleLoadingVisibility } = useGlobalLoading()

  const handleOnSubmit: SubmitHandler<IUserUpdate> = async (data) => {
    const areValuesNull = Object.values(data).every((actualData) => {
      if (actualData instanceof FileList) {
        data.avatar = actualData[0]
        return actualData.length === 0
      } else {
        return actualData == null
      }
    })

    if (areValuesNull) {
      toastUtils.error('All fields are empty')
    } else {
      toggleLoadingVisibility()
      await updateUser((user as IUser).id, data)
        .finally(() => {
          toggleLoadingVisibility()
        })
    }
  }

  const handleOnImageSuccess = (userKey: 'avatar' | 'header') => (imageFile: File, imageBlurFile: File) => {
    return updateUser(user?.id as number, { [userKey]: imageFile, [userKey + 'Blur']: imageBlurFile })
  }

  return (
    <TabPanel
      value={CTabsDataAccountTabPanel.information.name}
      title={CTabsDataAccountTabPanel.information.traduction}
      description={CTabsDataAccountTabPanel.information.description}
      showBackNavigation={showBackNavigation ?? true}
      showHeader={showHeaders ?? true}
      routingBy='routingSystem'
      loading={false}
    >
      <Box
        sx={{
          overflow: 'hidden'
        }}>
        <Box
          sx={{
            height: '10em',
            backgroundColor: 'var(--joy-palette-neutral-outlinedBorder)',
            overflow: 'hidden',
            position: 'relative'
          }}>
          <DropZone
            onSuccess={handleOnImageSuccess('header')}
            fileType='image/jpeg, image/jpg, image/png, image/webp'
            styles={{
              width: '100%',
              height: '100%',
              backdropFilter: 'blur(0.5px)',
              backgroundColor: 'rgba(1,1,1,0.5)'
            }}
            width={600}
            height={160}
          />
          <Image
            src={user?.header as unknown as string}
            srcBlurPlaceholder={user?.headerBlur as unknown as string}
            alt="wallpaper image"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </Box>
        <Box
          sx={{
            position: 'relative',
            width: '7.34375em',
            height: '7.34375em',
            borderRadius: '100%',
            border: '0.125em solid var(--joy-palette-background-surface)',
            backgroundColor: 'black',
            marginTop: '-3.5em !important',
            overflow: 'hidden',
            zIndex: '100'
          }}>
          <DropZone
            onSuccess={handleOnImageSuccess('avatar')}
            fileType='image/jpeg, image/jpg, image/png, image/webp'
            styles={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(1,1,1,0.5)'
            }}
            width={129.5}
            height={129.5}
          />
          <Image
            src={user?.avatar as unknown as string}
            srcBlurPlaceholder={user?.avatarBlur as unknown as string}
            alt="logo image"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </Box>
        <Form
          buttonSubmitName={t('save')}
          onSubmit={handleOnSubmit}
          inputsDataMain={accountInformationSelectedInputsArray}
          schema={accountInformationInputsAccountTabSchema}
          defaultValues={user}
          buttonSubmitSide='default'
          styles={{
            gridColumns: 1,
            width: '100%',
            display: 'grid',
            border: 'none',
            marginY: '1em',
            paddingY: '0px'
          }}
        />
      </Box>
    </TabPanel>
  )
}

export default AccountInformationTabPanel
