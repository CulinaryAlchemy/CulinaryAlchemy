import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { isAlreadyFileNameInArray } from '../util'

interface Params {
  inputName: string
  maxFiles: number
}

export const usePopperDropZone = ({ inputName, maxFiles }: Params) => {
  const [warning, setWarning] = useState<string | null>(null)
  const { watch, setValue } = useFormContext()
  const imageFiles = watch(inputName) as FileList
  const timeoutForError = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setValue(inputName, [])
    return () => {
      if (imageFiles != null && (imageFiles.length > 0) && (imageFiles.length <= maxFiles)) {
        setWarning(null)
        clearTimeout(timeoutForError.current)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addImages = (newImages: File[]) => {
    const totalImageCount = newImages.length + (imageFiles != null ? imageFiles.length : 0)

    if (totalImageCount > maxFiles) {
      setWarning(`You can only upload ${maxFiles} files`)
      if ((imageFiles.length > 0) && (imageFiles.length <= maxFiles)) {
        timeoutForError.current = setTimeout(() => {
          setWarning(null)
          clearTimeout(timeoutForError.current)
        }, 3000)
      }
      return
    } else {
      setWarning(null)
    }

    const newImagesFiltered: File[] = []
    let mergedImages = [...newImages]

    if (imageFiles != null) {
      newImages.forEach(newFile => {
        if (isAlreadyFileNameInArray(newFile.name, Array.from(imageFiles))) return
        newImagesFiltered.push(newFile)
      })

      mergedImages = [...imageFiles, ...newImagesFiltered]
    }

    setValue(inputName, mergedImages, { shouldValidate: true })
  }

  const removeImage = (fileIndex: number) => {
    const newImages = Array.from(imageFiles).toSpliced(fileIndex, 1)
    setValue(inputName, newImages)
  }

  return {
    imageFiles,
    addImages,
    removeImage,
    warning
  }
}
