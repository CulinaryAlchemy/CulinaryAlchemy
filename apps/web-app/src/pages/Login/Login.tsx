import { Form } from '@/components'
import { GlobalLayout } from '@/layouts'
import { LoginFooter, LoginHeader } from './components'

import { metada } from './config'
import { inputsData, loginInputsSchema } from './models'

const Login = () => {
  return (
    <GlobalLayout newTitle={metada.title}>
      <Form
        schema={loginInputsSchema}
        inputsData={inputsData}
        onSumbit={() => { console.log('sumbit') }}
        buttonSumbitName='log in'
        Header={<LoginHeader />}
        Footer={<LoginFooter />}
      />
    </GlobalLayout>
  )
}

export default Login
