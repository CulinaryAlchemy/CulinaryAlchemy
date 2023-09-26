import { Form } from '@/components'
import { GlobalLayout } from '@/layouts'

import { useGlobalAuth, useGlobalLoading, useTranslation } from '@/hooks'
import { type IUserRegister } from '@/models/LOGIC'
import { type FieldValues, type SubmitHandler } from 'react-hook-form'
import { RegisterFooter, RegisterHeader } from './components/'
import { metadata } from './config'
import { inputsArray, registerInputsSchema } from './models'

const Register = () => {
  const { t } = useTranslation()
  const { signUp } = useGlobalAuth()
  const { toggleLoadingVisibility } = useGlobalLoading()

  const handleOnSumbit: SubmitHandler<FieldValues> = async (data) => {
    toggleLoadingVisibility()
    await signUp(data as IUserRegister)
      .finally(() => {
        toggleLoadingVisibility()
      })
  }

  return (
    <GlobalLayout newTitle={metadata.title}>
      <Form
        inputsDataMain={inputsArray}
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
    </GlobalLayout>
  )
}

export default Register
