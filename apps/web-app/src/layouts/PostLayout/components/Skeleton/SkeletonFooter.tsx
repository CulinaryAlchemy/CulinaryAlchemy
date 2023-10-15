import Button from '@mui/joy/Button'
import Skeleton from '@mui/joy/Skeleton'
import Stack from '@mui/joy/Stack'

import { CPostFooter } from '@/layouts/PostLayout/models/ui'

export const PostLayoutSkeletonFooter = () => {
  return (
        <Stack
            component='footer'
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '1em',
              paddingInline: '1em',
              gap: '1em'
            }}
        >
            {
                CPostFooter.buttons.map((button) => (
                    <Button key={button.name} size='sm' variant='plain' color='neutral' startDecorator={
                        button.icon
                    }>
                        <Skeleton level='body2'>3</Skeleton>
                    </Button>
                ))
            }
        </Stack>
  )
}
