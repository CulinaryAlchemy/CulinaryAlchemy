import { Form } from '@/components'
import { GlobalLayout } from '@/layouts'

import { useGlobalAuth, useTranslation } from '@/hooks'
import { type IUserRegister } from '@/models/LOGIC'
import { type FieldValues, type SubmitHandler } from 'react-hook-form'
import { RegisterFooter, RegisterHeader } from './components/'
import { inputsData, registerInputsSchema } from './models'

const Register = () => {
  const { t } = useTranslation()
  const { signUp } = useGlobalAuth()

  const handleOnSumbit: SubmitHandler<FieldValues> = (data) => {
    void signUp(data as IUserRegister)
  }

  return (
    <GlobalLayout newTitle={t('sign up')}>
      <Form
        inputsData={inputsData}
        schema={registerInputsSchema}
        buttonSumbitName={t('sign up')}
        onSumbit={handleOnSumbit}
        Header= {<RegisterHeader />}
        Footer={<RegisterFooter />}
        styles={{ gridColumns: 1 }}
      />
    </GlobalLayout>
  )
}

export default Register
