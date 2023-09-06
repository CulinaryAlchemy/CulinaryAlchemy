import { type TFormInputArray } from '@/components/Form/models'
import { CInputUser } from '@/models/UI'
import { getDynamicSchemas } from '@/utils'
import { z as ZValidator } from 'zod'

export const accountInformationSelectedInputsArray: TFormInputArray = [
  CInputUser.username,
  CInputUser.name,
  {
    ...CInputUser.email,
    // @ts-expect-error ts does not allow this by our types : (
    async: true
  },
  CInputUser.description,
  CInputUser.location
]


const accountInformationDynamicInputsSchemas = getDynamicSchemas(accountInformationSelectedInputsArray)

export const accountInformationInputsAccountTabSchema = ZValidator.object(accountInformationDynamicInputsSchemas).deepPartial()
