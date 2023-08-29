import { Suspense, lazy } from 'react'

const Stack = lazy(() => import('@mui/joy/Stack'))
const Box = lazy(() => import('@mui/joy/Box'))
const Button = lazy(() => import('@mui/joy/Button'))
const Divider = lazy(() => import('@mui/joy/Divider'))
const DefaultModal = lazy(() => import('@mui/joy/Modal'))
const ModalDialog = lazy(() => import('@mui/joy/ModalDialog'))
const ModalClose = lazy(() => import('@mui/joy/ModalClose'))
const Typography = lazy(() => import('@mui/joy/Typography'))

interface IStyles {
  maxWidth?: string
  buttonColor?: 'neutral' | 'danger'
  width?: string
}

interface IProps {
  open: boolean
  title: string
  styles: IStyles
  handleOnClickModal: () => void
  children?: React.ReactNode
  buttonAcceptText?: string
  text?: string
  onAccept?: () => unknown
}

const Modal: React.FC<IProps> = ({ title, text, styles, onAccept, buttonAcceptText, open, handleOnClickModal, children }) => {
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
              maxWidth: styles.maxWidth,
              width: styles.width
            }}
          >
            <header>
              <Stack direction='row' sx={{ gap: '0.4em' }}>
                <Typography
                  id="alert-dialog-modal-title"
                  level="h2"
                  sx={{ texWrap: 'balance' }}
                >
                  {title}
                </Typography>
                <ModalClose />
              </Stack>
            </header>
            <Divider />
            <main>
                {
                  text != null &&
                  <Typography
                    id="alert-dialog-modal-description"
                    sx={{ texWrap: 'balance' }}
                  >
                    {text}
                  </Typography>
                }
                {children}
            </main>
            <footer>
              {
                buttonAcceptText != null &&
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                  <Button variant="outlined" color={styles.buttonColor} onClick={handleOnAccept}>
                    {buttonAcceptText ?? 'OK'}
                  </Button>
                </Box>
              }
            </footer>
          </ModalDialog>
        </DefaultModal>
      }
    </Suspense>
  )
}

export default Modal
