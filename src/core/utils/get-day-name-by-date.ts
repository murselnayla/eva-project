export const getDayNameByDate = (dateData: string) => {
  const date = new Date(dateData)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}
