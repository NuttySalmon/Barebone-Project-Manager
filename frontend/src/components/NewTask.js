import { Box, Grid, IconButton, TextField, Tooltip } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import React from 'react'
import { useState } from 'react'

const NewTask = ({ storyAddTask }) => {
  const [taskName, setTaskName] = useState('')
  const addTask = async () => {
    if (taskName) {
      console.log(taskName)
      setTaskName('')
      storyAddTask(taskName)
    }
  }
  return (
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
          <IconButton onClick={addTask}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default NewTask
