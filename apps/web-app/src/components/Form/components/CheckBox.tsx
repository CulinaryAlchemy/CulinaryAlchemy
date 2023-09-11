import { type TCheckBoxForm } from '@/components/Form/models'
import CheckIcon from '@mui/icons-material/Check'
import Checkbox from '@mui/joy/Checkbox'
import Chip from '@mui/joy/Chip'
import { type FieldValues, type UseFormRegisterReturn, type UseFormWatch } from 'react-hook-form'

interface IProps {
  data: TCheckBoxForm
  register: UseFormRegisterReturn<string>
  watch: UseFormWatch<FieldValues>
}

const CheckBox: React.FC<IProps> = ({ data, register, watch }) => {
  const isChecked = watch(data.name) as boolean || false

  return (
    <Chip
      variant="plain"
      color={isChecked ? 'primary' : 'neutral'}
      startDecorator={
        isChecked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
      }
      sx={{
        margin: '0.3em'
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
