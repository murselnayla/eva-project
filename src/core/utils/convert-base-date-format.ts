export function convertBaseDateFormat(dateString: string): string {
  const [year, month, day] = dateString.split('-')
  return `${month}-${day}-${year}`
}
