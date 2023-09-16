import { Form } from '@/components'
import { AuthLayout } from '@/layouts'

import { useGlobalAuth, useTranslation } from '@/hooks'
import { type IUserRegister } from '@/models/LOGIC'
import { type FieldValues, type SubmitHandler } from 'react-hook-form'
import { RegisterFooter, RegisterHeader } from './components/'
import { metadata } from './config'
import { inputsArray, registerInputsSchema } from './models'

const Register = () => {
  const { t } = useTranslation()
  const { signUp } = useGlobalAuth()

  const handleOnSumbit: SubmitHandler<FieldValues> = (data) => {
    signUp(data as IUserRegister)
  }

  return (
    <AuthLayout title={metadata.title} showBackground>
      <Form
        inputsData={inputsArray}
        schema={registerInputsSchema}
        buttonSubmitName={t('sign up')}
        onSubmit={handleOnSumbit}
        Header= {<RegisterHeader />}
        Footer={<RegisterFooter />}
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

export default Register
