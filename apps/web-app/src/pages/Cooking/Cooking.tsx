import StepViewer from '@/components/StepViewer/StepViewer'
import { useState } from 'react'

const Cooking = () => {
  const [showStepViewer, setShowStepViewer] = useState(true)

  const handleOnClickToggleStepViewerVisibility = () => {
    setShowStepViewer(!showStepViewer)
  }

  return (
    <>
      <StepViewer
        {... { showStepViewer }}
        handleOnClose={handleOnClickToggleStepViewerVisibility}
      />
    </>
  )
}

export default Cooking
