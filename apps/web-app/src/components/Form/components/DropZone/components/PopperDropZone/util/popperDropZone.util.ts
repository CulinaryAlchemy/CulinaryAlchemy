export const isAlreadyFileNameInArray = (fileName: string, array: File[]) => {
  return array.some((file) => file.name === fileName)
}
