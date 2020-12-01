import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import Axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../AuthService'
import { StoriesContext } from '../DataWrapper'
import { orderTasks } from '../utils'

const useStyle = makeStyles(theme => ({
  crossedOff: {
    textDecoration: 'line-through',
    color: theme.palette.grey.dark,
  },
}))

const TaskList = ({ tasks, setStoryData }) => {
  const { getAuthHeader } = useContext(UserContext)
  const { setReady } = useContext(StoriesContext)

  const toggleTaskComplete = async id => {
    let newValue
    setStoryData(prev => {
      setReady(false)
      const updatedTaskList = prev.Tasks.map(task => {
        if (task.id === id) {
          task.complete = !task.complete
          newValue = task.complete
        }
        return task
      })
      return { ...prev, Tasks: orderTasks(updatedTaskList) }
    })
    const res = await Axios.put(
      '/api/task/update',
      { id, complete: newValue },
      getAuthHeader()
    )
    if (res.status === 401) history.push('/signout')
    setReady(true)
  }

  const deleteTask = async id => {
    setReady(false)
    setStoryData(prev => {
      const updatedTaskList = prev.Tasks.filter(t => t.id !== id)
      return { ...prev, Tasks: updatedTaskList }
    })
    const res = await Axios.delete(`/api/task/delete?id=${id}`, getAuthHeader())
    if (res.status === 401) history.push('/signout')
    setReady(true)
  }

  const classes = useStyle()
  return (
    <List>
      {tasks.map(task => {
        const labelId = `checkbox-list-label-${task.id}`

        return (
          <ListItem
            key={task.id}
            role={undefined}
            onClick={() => {
              toggleTaskComplete(task.id)
            }}
            dense
            button
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.complete}
                color="primary"
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText
              id={labelId}
              primary={task.name}
              className={task.complete ? classes.crossedOff : null}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <DeleteOutline
                  fontSize="small"
                  onClick={() => {
                    deleteTask(task.id)
                  }}
                />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}

export default TaskList
