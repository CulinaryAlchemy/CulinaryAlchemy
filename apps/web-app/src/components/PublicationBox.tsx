import { Form } from '@/components'
import { type TFormInputArray } from '@/components/Form/models'
import { useTranslation } from '@/hooks'
import Sheet from '@mui/joy/Sheet'
import { type FieldValues, type SubmitHandler } from 'react-hook-form'
import { type ZodObject, type ZodRawShape } from 'zod'

interface IProps {
  schema: ZodObject<ZodRawShape>
  inputsDataMain: TFormInputArray
  inputsDataOptionals?: TFormInputArray
  inputsDataFooter: TFormInputArray
  onSubmit: SubmitHandler<FieldValues>
}

export const PublicationBox: React.FC<IProps> = ({ schema, inputsDataMain, inputsDataOptionals, inputsDataFooter, onSubmit }) => {
  const { t } = useTranslation()

  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'start',
        gap: '1em'
      }}
    >
      <Sheet
        sx={{
          maxWidth: {
            sx: '100%',
            md: '55em'
          },
          width: '100%'
        }}
      >
        <Form
          showResetButton={false}
          buttonSubmitName={t('post')}
          buttonSubmitSide='end'
          styles={{
            display: 'grid',
            width: '100%',
            border: 'none',
            paddingY: '0px',
            marginY: '0px',
            paddingX: '0px',
            gridTemplateAreasMain: '"title" "description"',
            inputsGap: '0.5em',
            gridTemplateAreasOptionals: '"authors_notes authors_notes" "servings cooking_time" "spices equipment_needed" "ingredients ingredients" "youtube_link youtube_link"'
          }}
          {...{ schema, inputsDataMain, inputsDataOptionals, inputsDataFooter, onSubmit }}
        />
      </Sheet>
    </Sheet>
  )
}
