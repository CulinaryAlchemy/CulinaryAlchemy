import { Error } from '@/components/Form/components/'
import { type TTextAreaForm } from '@/components/Form/models'
import { type IInputStyles } from '@/models/UI'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Textarea from '@mui/joy/Textarea'
import { type UseFormRegisterReturn } from 'react-hook-form'

interface IProps {
  data: TTextAreaForm
  error: string
  register: UseFormRegisterReturn<string>
  styles?: IInputStyles
}

const TextArea: React.FC<IProps> = ({ data, error, register, styles }) => {
  return (
    <FormControl
      sx={{
        width: '100%',
        gridArea: register.name
      }}
    >
      <FormLabel
        sx={{
          display: styles?.label?.display
        }}
      >
        {data.label}
      </FormLabel>
      <Textarea
        sx={{
          ...styles,
          '--Input-paddingInline': styles?.paddingInline,
          '&::before': styles?.border && {
            border: '1.5px solid var(--Input-focusedHighlight)',
            transform: 'scaleX(0)',
            left: '2.5px',
            right: '2.5px',
            bottom: 0,
            top: 'unset',
            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
            borderRadius: 0,
            borderBottomLeftRadius: '64px 20px',
            borderBottomRightRadius: '64px 20px'
          }
        }}
        {...register}
        {...(error !== '' && { error: true })}
        placeholder={data.placeholder} minRows={4}
      />
      <Error text={error} />
    </FormControl>
  )
}

export default TextArea
