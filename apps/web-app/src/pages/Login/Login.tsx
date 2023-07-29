import { Form } from '@/components'
import { GlobalLayout } from '@/layouts'
import { LoginFooter, LoginHeader } from './components'

import { useAuthContext } from '@/context'
import { type IUserSignIn } from '@/models'
import { type FieldValues, type SubmitHandler } from 'react-hook-form'
import { metada } from './config'
import { inputsData, loginInputsSchema } from './models'

const Login = () => {
  const { signIn } = useAuthContext()
  const handleOnSumbit: SubmitHandler<FieldValues> = (data) => {
    void signIn(data as IUserSignIn)
  }
  return (
    <GlobalLayout newTitle={metada.title}>
      <Form
        schema={loginInputsSchema}
        inputsData={inputsData}
        onSumbit={handleOnSumbit}
        buttonSumbitName='log in'
        Header={<LoginHeader />}
        Footer={<LoginFooter />}
      />
    </GlobalLayout>
  )
}

export default Login
