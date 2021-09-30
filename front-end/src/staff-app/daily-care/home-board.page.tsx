import React, { useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { ToolbarComponent } from "../components/toolbar/toolbar"
import { useStaffContext } from "staff-app/context/state-context"
import { getSearchedStudents, getSortedStudents, getFilteredStudents } from "../utils"

export const HomeBoardPage: React.FC = () => {
  const { state, dispatch } = useStaffContext()
  const [getStudents, data, studentsDataLoading] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    studentsDataLoading === "loaded" && dispatch({ type: "UPDATE_STUDENT_WITH_UNMARK_ROLE_TYPE", payload: data?.students })
  }, [studentsDataLoading, dispatch, data])

  const sortedStudents = data && getSortedStudents(state.updatedStudentRolls, state)
  const searchedStudents = sortedStudents && getSearchedStudents(sortedStudents, state.searchedString)
  const filteredStudents = searchedStudents && getFilteredStudents(searchedStudents, state)

  return (
    <>
      <S.PageContainer>
        <ToolbarComponent />
        {studentsDataLoading === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {studentsDataLoading === "loaded" && data?.students && (
          <>
            {filteredStudents.map((s: any) => (
              <StudentListTile key={s.id} student={s} />
            ))}
          </>
        )}

        {studentsDataLoading === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay />
    </>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
