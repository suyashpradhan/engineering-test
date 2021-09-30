export const isStudentInUpdatedStudentRolls = (updatedStudentRolls, student) => {
  return updatedStudentRolls.some((item) => item?.id === student?.id)
}
