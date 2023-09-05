import { Form } from '@/components'
import { GlobalLayout } from '@/layouts'
import { LoginFooter, LoginHeader } from './components'

import { useGlobalAuth, useTranslation } from '@/hooks'
import { type IUserSignIn } from '@/models/LOGIC'
import { type FieldValues, type SubmitHandler } from 'react-hook-form'
import { metadata } from './config'
import { inputsArray, loginInputsSchema } from './models'

const Login = () => {
  const { t } = useTranslation()
  const { signInByApi } = useGlobalAuth()
  const handleOnSumbit: SubmitHandler<FieldValues> = (data) => {
    void signInByApi(data as IUserSignIn)
  }
  return (
    <GlobalLayout newTitle={metadata.title}>
      <Form
        schema={loginInputsSchema}
        inputsData={inputsArray}
        onSubmit={handleOnSumbit}
        buttonSubmitName={t('login2')}
        Header={<LoginHeader />}
        Footer={<LoginFooter />}
        styles={{
          display: 'grid',
          gridColumns: 1,
          width: '300px'
        }}
      />
    </GlobalLayout>
  )
}

export default Login
