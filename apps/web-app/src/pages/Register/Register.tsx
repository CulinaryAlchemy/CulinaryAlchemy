import { Form } from '@/components'
import { GlobalLayout } from '@/layouts'

import { RegisterFooter, RegisterHeader } from './components/'
import { metadata } from './config'
import { inputsData } from './consts'
import { registerInputsSchema } from './schemas/'



const Register = () => {
  return (
    <GlobalLayout newTitle={metadata.title}>
      <Form
        inputsData={inputsData}
        schema={registerInputsSchema}
        buttonSumbitName='Register'
        onSumbit={() => { console.log('sumbit') }}
        Header= {<RegisterHeader />}
        Footer={<RegisterFooter />}
      />
    </GlobalLayout>
  )
}

export default Register
