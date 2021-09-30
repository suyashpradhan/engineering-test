import React, { createContext, useContext, useReducer } from "react"
import { stateReducer } from "staff-app/reducers/state-reducer"

// Initial State Values
const initialState = {
  searchedString: "",
  sort: {
    applied: false,
    firstName: false,
    lastName: false,
  },
  rollStateList: [{ type: "all" }, { type: "present" }, { type: "late" }, { type: "absent" }],
  updatedStudentRolls: [],
  filterType: "all",
}

// State Context
const StaffContext = createContext()

// State Context Provider
export const StaffProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  return <StaffContext.Provider value={{ state, dispatch }}>{children}</StaffContext.Provider>
}

// State Context Hook
export const useStaffContext = () => useContext(StaffContext)
