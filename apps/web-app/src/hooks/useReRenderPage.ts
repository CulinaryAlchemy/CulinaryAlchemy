import { reRenderPageService } from '@/services'
import { useEffect, useState } from 'react'

// This hook listen to the event from refresh from useRouting to re-render a component
export const useReRenderPage = () => {
  const [reRender, setReRender] = useState(0)

  useEffect(() => {
    const handleOnReRender = () => {
      setReRender((prevSate) => prevSate + 1)
    }

    reRenderPageService.listenEvent(handleOnReRender)

    return () => {
      reRenderPageService.removeEvent()
    }
  }, [])

  return { reRender }
}
