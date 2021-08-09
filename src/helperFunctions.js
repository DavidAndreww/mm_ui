export const parameterValidations = (parameters) => {
  if (parameters.engine === null) {
    window.alert('Please select a processing engine...')
    return false
  }
  if (parameters.market === null) {
    window.alert('Please select a market...')
    return false
  }
  if (parameters.brand === null) {
    window.alert('Please select a brand...')
    return false
  }
  if (parameters.currStartDate === null || parameters.currEndDate === null) {
    window.alert('Please select a valid date range for current period')
    return false
  }
  if (parameters.prevStartDate !== null && parameters.prevEndDate === null || parameters.prevStartDate === null && parameters.prevEndDate !== null) {
    window.alert('Please select a valid date range for prior period')
    return false
  }
  return true
}