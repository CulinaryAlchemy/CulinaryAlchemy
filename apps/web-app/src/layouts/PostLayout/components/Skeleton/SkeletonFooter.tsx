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
                        <Skeleton sx={{ fontWeight: 700, fontSize: 'var(--Typography-fontSize, var(--joy-fontSize-sm, 0.875rem))', textWrap: 'balance', color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))' }}>3</Skeleton>
                    </Button>
                ))
            }
        </Stack>
  )
}
