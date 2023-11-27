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
  maxHeight?: string
  layout?: 'fullscreen'
}

interface IProps {
  open: boolean
  title?: string
  styles?: IStyles
  handleOnClickModal: () => void
  children?: React.ReactNode
  buttonAcceptText?: string
  text?: string
  onAccept?: () => unknown
  showDividers?: boolean
}

const Modal: React.FC<IProps> = ({ showDividers = true, title, text, styles, onAccept, buttonAcceptText, open, handleOnClickModal, children }) => {
  const handleOnAccept = () => {
    handleOnClickModal()
    if (onAccept != null) onAccept()
  }

  return (
    <Suspense>
      {
        open &&
        <DefaultModal
          open={open}
          onClose={handleOnClickModal}
          sx={{
            overflow: 'hidden'
          }}
        >
          <ModalDialog
            layout={styles?.layout ?? 'center'}
            variant="outlined"
            role="alertdialog"
            aria-labelledby="alert-dialog-modal-title"
            aria-describedby="alert-dialog-modal-description"
            sx={{
              maxWidth: styles?.maxWidth,
              width: styles?.width,
              maxHeight: styles?.maxHeight,
              padding: 0,
              paddingBlockEnd: '1.25em',
              paddingInline: '1.25em',
              overflowY: 'auto'
            }}
          >
            <header
              style={{
                position: 'sticky',
                top: -0,
                zIndex: 400,
                backgroundColor: 'inherit',
                width: '100%'
              }}>
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.4em',
                  backgroundColor: 'inherit',
                  padding: '0',
                  paddingBlock: '1em 0.5em',
                  position: 'relative'
                }}
              >
                <Typography
                  id="alert-dialog-modal-title"
                  level="h2"
                  sx={{ texWrap: 'balance', margin: 0, padding: 0 }}
                >
                  {title}
                </Typography>
                <ModalClose
                  sx={{
                    position: 'relative',
                    top: 0,
                    right: 0
                  }}
                />
              </Stack>
            </header>
            {showDividers && <Divider />}
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
                  <Button variant="outlined" color={styles?.buttonColor} onClick={handleOnAccept}>
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
