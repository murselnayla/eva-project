export const getChartDateFormat = (dateData: string) => {
  const date = new Date(dateData)
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
  return `${dayOfWeek}, ${dateData}`
}
