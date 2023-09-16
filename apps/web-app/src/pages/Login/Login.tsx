import { Form } from '@/components'
import { useGlobalAuth, useTranslation } from '@/hooks'
import { AuthLayout } from '@/layouts'
import { type IUserSignIn } from '@/models/LOGIC'
import { type FieldValues, type SubmitHandler } from 'react-hook-form'
import { LoginFooter, LoginHeader } from './components'
import { metadata } from './config'
import { inputsArray, loginInputsSchema } from './models'

const Login = () => {
  const { t } = useTranslation()
  const { signInByApi } = useGlobalAuth()

  const handleOnSumbit: SubmitHandler<FieldValues> = (data) => {
    void signInByApi(data as IUserSignIn)
  }

  return (
    <AuthLayout title={metadata.title} showBackground>
      <Form
        schema={loginInputsSchema}
        inputsData={inputsArray}
        onSubmit={handleOnSumbit}
        buttonSubmitName={t('login2')}
        Header={<LoginHeader />}
        Footer={<LoginFooter />}
        buttonSubmitSide='default'
        styles={{
          display: 'grid',
          gridColumns: 1,
          width: '300px'
        }}
      />
    </AuthLayout>
  )
}

export default Login
