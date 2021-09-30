export const getFilteredStudents = (updatedStudents, state) => {
  return state.filterType === "all" ? updatedStudents : updatedStudents.filter((stuObj) => stuObj.type === state.filterType)
}
