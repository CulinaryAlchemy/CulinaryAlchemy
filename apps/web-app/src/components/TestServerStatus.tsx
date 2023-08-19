import { getServerStatus } from '@/services'
import { Suspense, lazy, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Modal = lazy(() => import('@/components/Modal/Modal'))

export const TestServerStatus = () => {
  const [isOffLine, setIsOffline] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    getServerStatus()
      .then(() => {
        setIsOffline(false)
      })
      .catch(() => {
        setIsOffline(true)
      })
  }, [])

  return (
    isOffLine &&
        <Suspense>
            <Modal
                title={t('wait some seconds')}
                text={t('server offline message')}
                styles={{ maxWidth: '35em' }}
            />
        </Suspense>
  )
}
