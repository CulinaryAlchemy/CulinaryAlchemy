import Box from '@mui/joy/Box'
import Card from '@mui/joy/Card'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Typography from '@mui/joy/Typography'
import { type UseFormRegisterReturn } from 'react-hook-form'

import { Error } from '@/components/Form/components/'
import { type TDropZoneForm } from '@/models/UI'

interface IProps {
  data: TDropZoneForm
  error: string
  register: UseFormRegisterReturn<string>
}

const DropZone: React.FC<IProps> = ({ data, error, register }) => {
  return (
    <FormControl key={data.name} sx={{ marginBottom: '0.5em' }}>
      <FormLabel>{data.label}</FormLabel>
      <Card
        variant="outlined"
        sx={[
          {
            borderRadius: 'sm',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center',
            px: 3,
            flexGrow: 1
          }
        ]}
      >
        <Box sx={{ p: 1, bgcolor: 'background.level1', borderRadius: '50%' }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: 'background.level2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i data-feather="upload-cloud" />
          </Box>
        </Box>
        <Typography level="body3" textAlign="center">
          <Input
            type={data.type}
            {...(error != null && { error: true })}
            {...register}
          />
          or drag and drop
          <br /> SVG, PNG, JPG or GIF (max. 800x400px)
        </Typography>
      </Card>
      <Error text={error} />
    </FormControl>
  )
}

export default DropZone
