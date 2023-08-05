import { Form } from '@/components'
import { GlobalLayout } from '@/layouts'
import { LoginFooter, LoginHeader } from './components'

import { useAuthContext } from '@/context'
import { useTranslation } from '@/hooks'
import { type IUserSignIn } from '@/models/LOGIC'
import { type FieldValues, type SubmitHandler } from 'react-hook-form'
import { inputsData, loginInputsSchema } from './models'

const Login = () => {
  const { t } = useTranslation()
  const { signIn } = useAuthContext()
  const handleOnSumbit: SubmitHandler<FieldValues> = (data) => {
    void signIn(data as IUserSignIn)
  }
  return (
    <GlobalLayout newTitle={t('login.title')}>
      <Form
        schema={loginInputsSchema}
        inputsData={inputsData}
        onSumbit={handleOnSumbit}
        buttonSumbitName={t('login.form.main.buttonName')}
        Header={<LoginHeader />}
        Footer={<LoginFooter />}
      />
    </GlobalLayout>
  )
}

export default Login
