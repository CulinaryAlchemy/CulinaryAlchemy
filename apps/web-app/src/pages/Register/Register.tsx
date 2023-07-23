import { Form } from '@/components'
import { GlobalLayout } from '@/layouts'

import { useAuth } from '@/hooks'
import { type IUserRegiser } from '@/models'
import { CRoutes } from '@/routing'
import { type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { RegisterFooter, RegisterHeader } from './components/'
import { metadata } from './config'
import { inputsData, registerInputsSchema } from './models'

const Register = () => {
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const handleOnSumbit: SubmitHandler<IUserRegiser> = (data) => {
    const userResponse = signUp(data)

    userResponse.then(() => {
      navigate(CRoutes.login)
    }).catch((error) => {
      console.log(error)
    })
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
