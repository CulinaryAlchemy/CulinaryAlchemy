import { Form, TabPanel } from '@/components'
import { useGlobalAuth, useTranslation, useUserMethods } from '@/hooks'
import { type IUser, type IUserUpdate } from '@/models/LOGIC'
import { CTabsData, inputsAccountTabSchema, inputsArray } from '@/pages/Settings/models/UI'
import { toastUtils } from '@/utils'
import Typography from '@mui/joy/Typography'
import { type SubmitHandler } from 'react-hook-form'

const AccountTabPanel = () => {
  const { t } = useTranslation()
  const { updateUser } = useUserMethods()
  const { user } = useGlobalAuth()

  const handleOnSumbit: SubmitHandler<IUserUpdate> = (data) => {
    const areValuesNull = Object.values(data).every((actualData) => {
      if (actualData instanceof FileList) {
        return actualData.length === 0
      } else {
        return actualData == null
      }
    })

    if (areValuesNull) {
      toastUtils.error('All fields are empty')
    } else {
      updateUser((user as IUser).id, { description: data.description })
    }
  }

  return (
    <TabPanel value={CTabsData.account.name} loading={false}>
      <Form
        buttonSumbitName={t('save')}
        onSumbit={handleOnSumbit}
        inputsData={inputsArray}
        schema={inputsAccountTabSchema}
        styles={{ gridColumns: 1, width: '400px' }}
        Header={
          <header>
            <Typography level="h3" component="h3">
              <b>{t('settings')}</b>
            </Typography>
          </header>
        }
      />
    </TabPanel>
  )
}

export default AccountTabPanel
