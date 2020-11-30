import {
  Checkbox,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from '@material-ui/core'
import { Comment as CommentIcon } from '@material-ui/icons'
import React from 'react'
const useStyle = makeStyles(theme => ({
  crossedOff: {
    textDecoration: 'line-through',
    color: theme.palette.grey.dark,
  },
}))
const TaskList = ({ tasks, toggleTaskComplete }) => {
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
