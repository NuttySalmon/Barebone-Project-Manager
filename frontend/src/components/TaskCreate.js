import { Grid, IconButton, TextField, Tooltip } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import Axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { UserContext } from '../AuthService'
import { StoriesContext } from '../DataWrapper'

const TaskCreate = ({ storyId, setStoryData }) => {
  const { getAuthHeader } = useContext(UserContext)
  const { setReady } = useContext(StoriesContext)
  const storyAddTask = async name => {
    setReady(false)
    const result = await Axios.post(
      '/api/task/create',
      { storyId, name: name },
      getAuthHeader()
    )

    if (result.status === 401) history.push('/signout')
    setStoryData(prev => ({
      ...prev,
      Tasks: [result.data, ...prev.Tasks],
    }))
    setReady(true)
  }
  const [taskName, setTaskName] = useState('')

  const addTask = async e => {
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
            placeholder="New task name"
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

export default TaskCreate
