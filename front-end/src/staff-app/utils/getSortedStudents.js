export const getSortedStudents = (studentsData, appState) => {
  const { sort } = appState
  console.log(sort)

  let sortedStudents
  let key
  let nameOne
  let nameTwo

  if (sort.applied) {
    /** SORT BY FIRST_NAME OR LAST_NAME */
    key = sort.firstName ? "first_name" : "last_name"

    sortedStudents = studentsData.sort((a, b) => {
      if (sort.ascending) {
        /**EITHER SORT BY ASCENDING */
        nameOne = a[key]
        nameTwo = b[key]
      } else {
        /**OR SORT BY DESCENDING */
        nameOne = b[key]
        nameTwo = a[key]
      }
      if (nameOne < nameTwo) {
        return -1
      }
      if (nameOne > nameTwo) {
        return 1
      }
      // names must be equal
      return 0
    })

    return sortedStudents
  }

  return studentsData
}
