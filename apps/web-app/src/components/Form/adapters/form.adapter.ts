export const adaptDefaultValues = (oldDefaultValues: object) => {
  if (oldDefaultValues == null) return undefined

  let newDefaultValues: object = {}

  console.log(oldDefaultValues)
  Object.entries(oldDefaultValues)
    .forEach(([key, value]) => {
      console.log({ key, value: value as string })
      if (value == null) {
        value = undefined
      }

      newDefaultValues = { ...newDefaultValues, [key]: value as string }
    })

  return newDefaultValues
}
