import { Suspense, lazy } from 'react'

const WarningRoundedIcon = lazy(() => import('@mui/icons-material/WarningRounded'))
const Box = lazy(() => import('@mui/joy/Box'))
const Button = lazy(() => import('@mui/joy/Button'))
const Divider = lazy(() => import('@mui/joy/Divider'))
const DefaultModal = lazy(() => import('@mui/joy/Modal'))
const ModalDialog = lazy(() => import('@mui/joy/ModalDialog'))
const Typography = lazy(() => import('@mui/joy/Typography'))

interface IStyles {
  maxWidth?: string
  buttonColor?: 'neutral' | 'danger'
}

interface IProps {
  open: boolean
  title: string
  text: string
  styles: IStyles
  buttonAcceptText?: string
  handleOnClickModal: () => void
  onAccept?: () => unknown
}

export const Modal: React.FC<IProps> = ({ title, text, styles, onAccept, buttonAcceptText, open, handleOnClickModal }) => {
  const handleOnAccept = () => {
    handleOnClickModal()
    if (onAccept != null) onAccept()
  }

  return (
    <Suspense>
      {
        open &&
        <DefaultModal open={open} onClose={handleOnClickModal}>
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
              <Button variant="outlined" color={styles.buttonColor} onClick={handleOnAccept}>
                {buttonAcceptText ?? 'OK'}
              </Button>
            </Box>
          </ModalDialog>
        </DefaultModal>
      }
    </Suspense>
  )
}
