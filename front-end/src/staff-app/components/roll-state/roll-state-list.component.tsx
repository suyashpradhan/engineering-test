import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { Spacing, FontWeight } from "shared/styles/styles"
import { RolllStateType } from "shared/models/roll"
import { useStaffContext } from "staff-app/context/state-context"

interface Props {
  size?: number
}
export const RollStateList: React.FC<Props> = ({ size = 14 }) => {
  const {
    state: { rollStateList, updatedStudentRolls },
    dispatch,
  } = useStaffContext()

  return (
    <S.ListContainer>
      {rollStateList.map((s: any, i: any) => {
        if (s.type === "all") {
          return (
            <S.ListItem key={i}>
              <FontAwesomeIcon icon="users" size="sm" style={{ cursor: "pointer" }} onClick={() => dispatch({ type: "FILTER_STUDENTS_BY_ROLL_TYPE", payload: s.type })} />
              <span>{updatedStudentRolls.count}</span>
            </S.ListItem>
          )
        }

        return (
          <S.ListItem key={i}>
            <RollStateIcon
              type={s.type}
              size={size}
              onClick={() => {
                dispatch({ type: "FILTER_STUDENTS_BY_ROLL_TYPE", payload: s.type })
              }}
            />
            <span>{updatedStudentRolls.filter((stateObj: any) => stateObj.type === s.type)?.length}</span>
          </S.ListItem>
        )
      })}
    </S.ListContainer>
  )
}

const S = {
  ListContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  ListItem: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${Spacing.u2};

    span {
      font-weight: ${FontWeight.strong};
      margin-left: ${Spacing.u2};
    }
  `,
}

interface StateList {
  type: ItemType
  count: number
}

type ItemType = RolllStateType | "all"
