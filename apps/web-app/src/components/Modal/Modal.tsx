import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import DefaultModal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Typography from '@mui/joy/Typography'
import { useState } from 'react'

interface IStyles {
  maxWidth: string
}

interface IProps {
  title: string
  text: string
  styles: IStyles
}

const Modal: React.FC<IProps> = ({ title, text, styles }) => {
  const [open, setOpen] = useState(true)

  const handleOnClose = () => {
    setOpen(false)
  }

  return (
    <>
      <DefaultModal open={open} onClose={handleOnClose}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
          sx={{
            maxWidth: styles.maxWidth
          }}
        >
          <Typography
            id="alert-dialog-modal-title"
            level="h2"
            startDecorator={<WarningRoundedIcon />}
            sx={{ texWrap: 'balance' }}
          >
            {title}
          </Typography>
          <Divider />
          <Typography
            id="alert-dialog-modal-description"
            textColor="text.tertiary"
            sx={{ texWrap: 'balance' }}
          >
            {text}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="outlined" color="neutral" onClick={handleOnClose}>
              OK
            </Button>
          </Box>
        </ModalDialog>
      </DefaultModal>
    </>
  )
}

export default Modal
