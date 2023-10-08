import { Form, Image } from '@/components'
import { type TFormInputArray } from '@/components/Form/models'
import { useGlobalAuth, useTranslation } from '@/hooks'
import Box from '@mui/joy/Box'
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
  const { user } = useGlobalAuth()
  const { t } = useTranslation()

  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        padding: '1em',
        gap: '1em',
        borderBottom: '0.1em solid var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-200, #D8D8DF))'
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '100%'
      }}>
        <Image
          src={user?.avatar as string}
          srcBlurPlaceholder={user?.avatarBlur as string}
          alt='user image'
          style={{
            aspectRatio: '1 / 1',
            width: '2.5em',
            borderRadius: '100%'
          }}
        />
      </Box>
      <Box sx={{
        flexGrow: 1
      }}>
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
      </Box>
    </Sheet>
  )
}
