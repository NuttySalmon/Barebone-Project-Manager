import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import { Comment as CommentIcon } from '@material-ui/icons'
import React from 'react'
const handleToggle = () => {}
const setdata = () => {}
const TaskList = ({ tasks }) => {
  return (
    <List>
      {tasks.map(task => {
        const labelId = `checkbox-list-label-${task.id}`

        return (
          <ListItem key={task.id} role={undefined} dense button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.complete}
                color="primary"
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
                onClick={handleToggle}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={task.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}

export default TaskList
