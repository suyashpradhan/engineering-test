import React from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { BorderRadius, Spacing } from "shared/styles/styles"
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { useStaffContext } from "staff-app/context/state-context"

export type ActiveRollAction = "filter" | "exit"

export const ActiveRollOverlay: React.FC = () => {
  const {
    state: { isRollMode },
    dispatch,
  } = useStaffContext()

  return (
    <S.Overlay isActive={isRollMode}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button
              color="inherit"
              onClick={() => {
                dispatch({ type: "CHANGE_ROLL_MODE", payload: false })
                dispatch({ type: "FILTER_STUDENTS_BY_ROLL_TYPE", payload: "all" })
              }}
            >
              Exit
            </Button>
            <Button
              color="inherit"
              style={{ marginLeft: Spacing.u2 }}
              onClick={() => {
                dispatch({ type: "CHANGE_ROLL_MODE", payload: false })
                dispatch({ type: "FILTER_STUDENTS_BY_ROLL_TYPE", payload: "all" })
              }}
            >
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
}
