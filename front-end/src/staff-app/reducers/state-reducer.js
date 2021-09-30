import * as ACTIONS from "./reducer.actions"
import { isStudentInUpdatedStudentRolls } from "../utils"

export const stateReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_USER_ROLL:
      return { ...state, isRollMode: action.payload }

    case ACTIONS.TOGGLE_SWITCH:
      return {
        ...state,
        sort: { ...state.sort, applied: !state.sort.applied },
      }

    case ACTIONS.TOGGLE_BY_NAME:
      return {
        ...state,
        sort: { ...state.sort, firstName: !state.sort.firstName },
      }

    case ACTIONS.TOGGLE_BY_ORDER:
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

    case ACTIONS.ADD_OR_UPDATE_STUDENTS:
      const newStudent = action.payload
      const existingStudentRolls = state.updatedStudentRolls

      const latestChanges = isStudentInUpdatedStudentRolls(existingStudentRolls, newStudent)
        ? existingStudentRolls.map((studentObj) => (studentObj.id === newStudent.id ? { ...newStudent } : { ...studentObj }))
        : existingStudentRolls.concat(action.payload)
      return {
        ...state,
        updatedStudentRolls: latestChanges,
      }

    case ACTIONS.UPDATE_STUDENT_WITH_UNMARK_ROLE:
      return {
        ...state,
        updatedStudentRolls: state.updatedStudentRolls.concat(action.payload.map((stuObj) => ({ ...stuObj, type: "unmark" }))),
      }

    case ACTIONS.FILTER_STUDENT_ROLE:
      return {
        ...state,
        filterType: action.payload,
      }

    default:
      return state
  }
}
