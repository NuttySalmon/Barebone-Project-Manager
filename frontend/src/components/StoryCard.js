import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { useDrag } from 'react-dnd'
import {
  SettingsOutlined as SettingsIcon,
  Event as DateIcon,
  Person as PersonIcon,
} from '@material-ui/icons'
import {
  Avatar,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Link,
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { DragItemTypes } from './Dashboard'

const useStyles = makeStyles(theme => ({
  dragging: {
    opacity: 0.3,
  },
  card: {
    transition: 'all 0.1s',
    '&:hover': {
      outlineColor: theme.palette.primary.main,
      outlineStyle: 'solid',
    },
  },
  cardDragging: {
    '&:hover': {
      outlineStyle: 'none',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  button: {
    float: 'right',
    fontSize: 20,
    color: theme.palette.text.secondary,
    width: 'fit-content',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  action: {
    justifyContent: 'flex-end',
    paddingTop: 0,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  textContent: {
    float: 'left',
  },
}))

export default function StoryCard() {
  const classes = useStyles()
  const [{ isDragging }, drag] = useDrag({
    item: { type: DragItemTypes.CARD },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  return (
    <Grid ref={drag} item className={isDragging && classes.dragging}>
      <Card
        elevation={3}
        className={`${classes.card} ${isDragging && classes.cardDragging}`}
      >
        <Tooltip title="Edit story">
          <IconButton size="small" className={classes.button}>
            <SettingsIcon style={{ width: 20 }} />
          </IconButton>
        </Tooltip>
        <CardContent className={classes.textContent}>
          <Typography variant="body2">
            <Tooltip title="View story details">
              <Link component={RouterLink} to="/story/123">
                #123
              </Link>
            </Tooltip>
          </Typography>
          <Typography variant="h6" gutterBottom>
            Story bla bla
          </Typography>
          {/* <Typography variant="body2" component="p"></Typography> */}
          <Typography variant="subtitle2" color="textSecondary">
            <Grid container item alignItems="center">
              <DateIcon className={classes.icon} />
              1/1/2020
            </Grid>
            <Grid container item alignItems="center">
              <PersonIcon className={classes.icon} />
              <Chip
                avatar={<Avatar>J</Avatar>}
                label="John Doe"
                size="small"
                variant="outlined"
                color="primary"
                clickable
              />
            </Grid>
          </Typography>
        </CardContent>
        <CardActions className={classes.action}></CardActions>
      </Card>
    </Grid>
  )
}
