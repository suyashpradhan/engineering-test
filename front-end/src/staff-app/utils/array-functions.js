export const isStudentUpdated = (updatedStudentRolls, student) => {
  return updatedStudentRolls.some((item) => item?.id === student?.id)
}
