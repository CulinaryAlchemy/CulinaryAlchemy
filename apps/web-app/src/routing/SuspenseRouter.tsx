import { createBrowserHistory, type BrowserHistory, type Update } from 'history'
import { useLayoutEffect, useRef, useState, useTransition } from 'react'
import { Router } from 'react-router-dom'

export interface BrowserRouterProps {
  basename?: string
  children?: React.ReactNode
  window?: Window
}

export function SuspenseRouter ({ basename, children, window }: BrowserRouterProps) {
  const historyRef = useRef<BrowserHistory>()
  const [, startTransition] = useTransition()

  if (historyRef.current == null) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    historyRef.current = createBrowserHistory({ window })
  }

  // eslint-disable-next-line
  const history = historyRef.current
  const [state, setState] = useState({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    action: history.action,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    location: history.location
  })

  function setStateAsync (update: Update) {
    startTransition(() => {
      // eslint-disable-next-line
      setState(update)
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  useLayoutEffect(() => history.listen(setStateAsync), [history])

  return (
    <Router
      basename={basename}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      location={state.location}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      navigationType={state.action}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      navigator={history}
    >
      {children}
    </Router>
  )
}
