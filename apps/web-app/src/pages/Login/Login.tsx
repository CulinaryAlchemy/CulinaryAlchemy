import { Form } from '@/components'
import { GlobalLayout } from '@/layouts'
import { LoginFooter, LoginHeader } from './components'

import { useAuth } from '@/hooks'
import { type IUserSignIn } from '@/models'
import { type SubmitHandler } from 'react-hook-form'
import { metada } from './config'
import { inputsData, loginInputsSchema } from './models'

const Login = () => {
  const { signIn } = useAuth()
  const handleOnSumbit: SubmitHandler<IUserSignIn> = (data) => {
    void signIn(data)
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
