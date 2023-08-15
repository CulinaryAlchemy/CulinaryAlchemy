import { Form } from '@/components'
import { GlobalLayout } from '@/layouts'
import { LoginFooter, LoginHeader } from './components'

import { useGlobalAuth, useTranslation } from '@/hooks'
import { type IUserSignIn } from '@/models/LOGIC'
import { type FieldValues, type SubmitHandler } from 'react-hook-form'
import { inputsArray, loginInputsSchema } from './models'

const Login = () => {
  const { t } = useTranslation()
  const { signIn } = useGlobalAuth()
  const handleOnSumbit: SubmitHandler<FieldValues> = (data) => {
    void signIn(data as IUserSignIn)
  }
  return (
    <GlobalLayout newTitle={t('login')}>
      <Form
        schema={loginInputsSchema}
        inputsData={inputsArray}
        onSumbit={handleOnSumbit}
        buttonSumbitName={t('login2')}
        Header={<LoginHeader />}
        Footer={<LoginFooter />}
        styles={{ gridColumns: 1, width: '300px' }}
      />
    </GlobalLayout>
  )
}

export default Login
