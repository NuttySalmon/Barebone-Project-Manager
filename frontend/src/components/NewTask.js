import { Box, Grid, IconButton, TextField, Tooltip } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import React from 'react'
import { useState } from 'react'

const NewTask = ({ storyAddTask }) => {
  const [taskName, setTaskName] = useState('')
  const addTask = async (e) => {
    e.preventDefault()
    if (taskName) {
      console.log(taskName)
      setTaskName('')
      storyAddTask(taskName)
    }
  }
  return (
    <form onSubmit={addTask}>
      <Grid container>
        <Grid item xs={11}>
          <TextField
            fullWidth
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
          />
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Add new task">
            <IconButton type="submit">
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </form>
  )
}

export default NewTask
