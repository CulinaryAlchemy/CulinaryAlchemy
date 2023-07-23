import { Form } from '@/components'
import { GlobalLayout } from '@/layouts'

import { useAuth } from '@/hooks'
import { type IUserRegiser } from '@/models'
import { type SubmitHandler } from 'react-hook-form'
import { RegisterFooter, RegisterHeader } from './components/'
import { metadata } from './config'
import { inputsData, registerInputsSchema } from './models'

const Register = () => {
  const { signUp } = useAuth()

  const handleOnSumbit: SubmitHandler<IUserRegiser> = (data) => {
    void signUp(data)
  }

  return (
    <GlobalLayout newTitle={metadata.title}>
      <Form
        inputsData={inputsData}
        schema={registerInputsSchema}
        buttonSumbitName='Register'
        onSumbit={handleOnSumbit}
        Header= {<RegisterHeader />}
        Footer={<RegisterFooter />}
      />
    </GlobalLayout>
  )
}

export default Register
