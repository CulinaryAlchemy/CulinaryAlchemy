import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import { type UseFormRegisterReturn } from 'react-hook-form'

import { Error } from '@/components/Form/components/'
import { type TTextFieldForm } from '@/components/Form/models/'
import { type IInputStyles } from '@/models/UI'

interface IProps {
  data: TTextFieldForm
  error: string
  register: UseFormRegisterReturn<string>
  styles?: IInputStyles
  isReadOnly?: boolean
}

const TextField: React.FC<IProps> = ({ isReadOnly = false, data, error, register, styles }) => {
  return (
    <FormControl sx={{
      marginBottom: '0.5em',
      gridArea: register.name
    }}>
      <FormLabel
        sx={{
          display: styles?.label?.display
        }}
      >
        {data.label}
      </FormLabel>
      <Input
        sx={{
          ...styles,
          Width: '1px',
          '--Input-minWidth': '1px',
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
        defaultValue={data.defaultValue as string}
        type={data.type}
        autoComplete='off'
        placeholder={data.placeholder}
        {...(error !== '' && { error: true })}
        {...register}
        readOnly={isReadOnly}
      />
      <Error text={error} />
    </FormControl>
  )
}

export default TextField
