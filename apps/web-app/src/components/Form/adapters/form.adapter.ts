export const adaptDefaultValues = (oldDefaultValues: object) => {
  if (oldDefaultValues == null) return undefined

  let newDefaultValues: object = {}

  Object.entries(oldDefaultValues)
    .forEach(([key, value]) => {
      if (value == null) {
        value = undefined
      }

      newDefaultValues = { ...newDefaultValues, [key]: value as string }
    })

  return newDefaultValues
}
