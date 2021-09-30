import React from "react"
import { Grid } from "@material-ui/core"
import { Colors } from "shared/styles/colors"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { useStaffContext } from "staff-app/context/state-context"

export const Search = () => {
  const {
    state: { searchedString },
    dispatch,
  } = useStaffContext()

  return (
    <>
      <>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <TextField
              multiline
              rowsMax={1}
              size="small"
              type="search"
              value={searchedString}
              label="Search User"
              variant="filled"
              fullWidth={false}
              onChange={(e) => dispatch({ type: "SEARCH_STUDENT_NAME", payload: e.target.value })}
              placeholder="John Doe"
              InputProps={{ style: { backgroundColor: `${Colors.neutral.lighter}` } }}
            />
          </Grid>
          <Grid item>
            {searchedString.length > 0 && (
              <Button size="small" variant="contained" onClick={() => dispatch({ type: "RESET_SEARCH_STRING" })}>
                Clear
              </Button>
            )}
          </Grid>
        </Grid>
      </>
    </>
  )
}
