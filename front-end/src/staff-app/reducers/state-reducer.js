import * as ACTIONS from "./reducer.actions"
import { isStudentInUpdatedStudentRolls } from "../utils"

export const stateReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_ROLL_MODE":
      return { ...state, isRollMode: action.payload }

    case "TOGGLE_SORT":
      return {
        ...state,
        sort: { ...state.sort, applied: !state.sort.applied },
      }

    case "SORT_BY_FIRSTNAME_OR_LASTNAME":
      return {
        ...state,
        sort: { ...state.sort, firstName: !state.sort.firstName },
      }

    case "SORT_BY_ASCENDING_OR_DESCENDING":
      return {
        ...state,
        sort: { ...state.sort, ascending: !state.sort.ascending },
      }

    case ACTIONS.SEARCH_RESULTS:
      return {
        ...state,
        searchedString: action.payload,
      }

    case ACTIONS.CLEAR_SEARCH:
      return { ...state, searchedString: "" }

    case "ADD_OR_UPDATE_STUDENT_INTO_UPDATED_STUDENT_ROLLS":
      const newStudent = action.payload
      const existingStudentRolls = state.updatedStudentRolls

      const latestChanges = isStudentInUpdatedStudentRolls(existingStudentRolls, newStudent)
        ? existingStudentRolls.map((studentObj, i) => (studentObj.id === newStudent.id ? { ...newStudent } : { ...studentObj }))
        : existingStudentRolls.concat(action.payload)
      return {
        ...state,
        updatedStudentRolls: latestChanges,
      }

    case "ADD_ALL_STUDENTS_WITH_ROLL_TYPE_AS_UNMARK_INTO_UPDATED_STUDENT_ROLLS":
      return {
        ...state,
        updatedStudentRolls: state.updatedStudentRolls.concat(action.payload.map((stuObj) => ({ ...stuObj, type: "unmark" }))),
      }

    case "FILTER_STUDENTS_BY_ROLL_TYPE":
      return {
        ...state,
        filterType: action.payload,
      }

    default:
      return state
  }
}
