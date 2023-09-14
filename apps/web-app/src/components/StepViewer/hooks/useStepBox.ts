import { useState } from 'react'

export const useStepBox = () => {
  const [actualStep, setActualStep] = useState()
  return { actualStep, setActualStep }
}
