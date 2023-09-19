import { Form } from '@/components'
import { GlobalLayout } from '@/layouts'
import { LoginFooter, LoginHeader } from './components'

import { useGlobalAuth, useGlobalLoading, useTranslation } from '@/hooks'
import { type IUserSignIn } from '@/models/LOGIC'
import { type FieldValues, type SubmitHandler } from 'react-hook-form'
import { metadata } from './config'
import { inputsArray, loginInputsSchema } from './models'

const Login = () => {
  const { t } = useTranslation()
  const { signInByApi } = useGlobalAuth()
  const { toggleLoadingVisibility } = useGlobalLoading()

  const handleOnSumbit: SubmitHandler<FieldValues> = async (data) => {
    toggleLoadingVisibility()
    await signInByApi(data as IUserSignIn)
      .finally(() => {
        toggleLoadingVisibility()
      })
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
        buttonSubmitSide='default'
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
