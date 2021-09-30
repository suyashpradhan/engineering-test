export const isStudentInUpdatedStudentRolls = (updatedStudentRolls, student) => {
  return updatedStudentRolls.some((item) => item?.id === student?.id)
}

export const transformArrayToRollInputObj = (updatedStudentRolls) => {
  return updatedStudentRolls.map((stuObj) => ({ student_id: stuObj.id, roll_state: stuObj.type }))
}
