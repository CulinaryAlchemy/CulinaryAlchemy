import { type IStep, type TStepArray } from '@/models/LOGIC'
import { startTransition, useEffect, useState } from 'react'

export const useStepViewerMain = (defaultSteps: TStepArray | undefined) => {
  const [steps, setSteps] = useState(defaultSteps)
  const [isTheFirstStepOptimistic, setIsTheFirstStepOptimistic] = useState(true)

  useEffect(() => {

  }, [steps])

  const addNewStep = (newStep: IStep) => {
    const isNotUnique = steps?.find(step => step.stepName.toLocaleLowerCase() === newStep.stepName.toLocaleLowerCase())
    if (isNotUnique) return

    let newSteps = [newStep]

    if (steps != null) {
      newSteps = [
        ...steps,
        newStep
      ]
    }

    startTransition(() => {
      setSteps(newSteps)
    })
  }

  const updateStep = (oldStepName: string, updatedStep: IStep) => {
    if (steps?.[0] == null) return

    const foundStepIndex = steps.findIndex((step) => step.stepName === oldStepName)

    if (foundStepIndex === -1) return

    const newSteps = [...steps]

    newSteps[foundStepIndex] = updatedStep

    setSteps(newSteps)
  }

  const removeStep = (stepTitle: string) => {
    if (steps == null) return
    setSteps((prevSteps) => {
      if (prevSteps == null) return prevSteps
      const newSteps = prevSteps.filter(step => step.stepName !== stepTitle)
      return newSteps
    })
  }

  const resetStep = (stepTitle: string, oldStepValues: IStep) => {
    if (steps == null) return
    setSteps((prevSteps) => {
      if (prevSteps == null) return prevSteps
      const foundStep = prevSteps.findIndex((step) => step.stepName === stepTitle)
      const newSteps = [...prevSteps]
      newSteps[foundStep] = oldStepValues
      return newSteps
    })
  }

  const toggleIsTheFirstStepOptimistic = () => {
    setIsTheFirstStepOptimistic(prevState => !prevState)
    addNewStep({ stepName: '', stepDescription: '' })
  }

  return {
    steps,
    isTheFirstStepOptimistic,
    addNewStep,
    removeStep,
    toggleIsTheFirstStepOptimistic,
    updateStep,
    resetStep
  }
}
