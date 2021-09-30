export const getSortedStudents = (studentsData, appState) => {
  const { sort } = appState

  let sortedStudents
  let key
  let nameOne
  let nameTwo

  if (sort.applied) {
    key = sort.firstName ? "first_name" : "last_name"

    sortedStudents = studentsData.sort((a, b) => {
      if (sort.ascending) {
        nameOne = a[key]
        nameTwo = b[key]
      } else {
        nameOne = b[key]
        nameTwo = a[key]
      }
      if (nameOne < nameTwo) {
        return -1
      }
      if (nameOne > nameTwo) {
        return 1
      }
      return 0
    })

    return sortedStudents
  }

  return studentsData
}
