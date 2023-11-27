import { CPostFooter } from '@/layouts/PostLayout/models/ui'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography'

export const PostFooter = () => {
  return (
    <Box
      component='footer'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '1em',
        paddingInline: '1em'
      }}
    >
      {
        CPostFooter.buttons.map((button) => (
          <Button key={button.name} size='sm' variant='plain' color='neutral' startDecorator={
            button.icon
          }>
            <Typography sx={{ fontWeight: 700, fontSize: 'var(--Typography-fontSize, var(--joy-fontSize-sm, 0.875rem))', textWrap: 'balance', color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))' }}>3</Typography>
          </Button>
        ))
      }
    </Box>
  )
}
