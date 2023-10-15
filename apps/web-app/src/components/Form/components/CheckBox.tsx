import { type TCheckBoxForm } from '@/components/Form/models'
import CheckIcon from '@mui/icons-material/Check'
import Checkbox from '@mui/joy/Checkbox'
import Chip from '@mui/joy/Chip'
import { useFormContext, type UseFormRegisterReturn } from 'react-hook-form'

interface IProps {
  data: TCheckBoxForm
  register: UseFormRegisterReturn<string>
}

const CheckBox: React.FC<IProps> = ({ data, register }) => {
  const { watch } = useFormContext()

  const isChecked = watch(data.name) as boolean || false

  return (
    <Chip
      variant="plain"
      color={isChecked ? 'primary' : 'neutral'}
      startDecorator={
        isChecked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
      }
      sx={{
        margin: '0.3em',
        gridArea: register.name
      }}
    >
      <Checkbox
        variant="outlined"
        color={isChecked ? 'primary' : 'neutral'}
        disableIcon
        overlay
        label={data.label}
        checked={isChecked}
        {...register}
      />
    </Chip>
  )
}

export default CheckBox
