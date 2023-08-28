import { getServerStatus } from '@/services'
import { lazy, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Modal = lazy(() => import('@/components/Modal/Modal'))

export const TestServerStatus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useTranslation()

  const handleOnClickModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  useEffect(() => {
    getServerStatus()
      .then(() => {
        setIsModalOpen(false)
      })
      .catch(() => {
        setIsModalOpen(true)
      })
  }, [])

  return (
    <Modal
      open={isModalOpen}
      handleOnClickModal={handleOnClickModal}
      title={t('wait some seconds')}
      text={t('server offline message')}
      styles={{ maxWidth: '35em', buttonColor: 'neutral' }}
    />
  )
}
