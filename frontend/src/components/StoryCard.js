import React, { useContext } from 'react'
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
import { Avatar, Chip, Grid, IconButton, Tooltip } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { DragItemTypes } from './Dashboard'
import { StoriesContext } from '../DataWrapper'
import UILink from '../layout/UILink'
import { limitLongStr } from '../utils'

const useStyles = makeStyles(theme => ({
  dragging: { opacity: 0.3 },
  card: {
    transition: 'all 0.1s',
    '&:hover': {
      boxShadow:
        '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);',
    },
  },
  title: { fontSize: 14 },
  button: {
    // float: 'right',
    fontSize: 20,
    color: theme.palette.text.secondary,
    // width: 'fit-content',
    // top: theme.spacing(2),
    // right: theme.spacing(2),
  },
  action: { justifyContent: 'flex-end', paddingTop: 0 },
  icon: { fontSize: 15, marginRight: theme.spacing(1) },
  details: { display: 'flex', alignItems: 'center', marginRight: 'auto' },
  textContent: {
    //  float: 'left'
  },
}))

export default function StoryCard({ id, status, name, end_date, User }) {
  const classes = useStyles()
  const { updateStoryStatus } = useContext(StoriesContext)

  /**
   * Values in by useDrag from drop target when dropped
   * @param {*} item
   * @param {*} monitor
   */
  const handleDrop = (item, monitor) => {
    // get new status value
    const dropResult = monitor.getDropResult()
    if (!dropResult) return // ignore if drop result is null
    const { statusNum } = dropResult
    console.log('dropped:', statusNum)
    updateStoryStatus(id, status, statusNum) // update status value
  }

  // setup drag
  const [{ isDragging }, drag] = useDrag({
    item: { type: DragItemTypes.CARD },
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
    end: handleDrop,
  })

  return (
    <Grid ref={drag} item className={`${isDragging && classes.dragging}`}>
      <Card className={classes.card}>
        <CardContent className={classes.textContent}>
          <Grid container>
            <Grid item className={classes.details}>
              <Tooltip title="View story details">
                <UILink to={`/story/details/${id}`}>
                  <Typography variant="body2">{`#${id}`}</Typography>
                </UILink>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Edit story">
                <RouterLink to={`/story/${id}/edit`}>
                  <IconButton size="small" className={classes.button}>
                    <SettingsIcon style={{ width: 20 }} />
                  </IconButton>
                </RouterLink>
              </Tooltip>
            </Grid>
          </Grid>
          <Typography variant="h6" gutterBottom>
            {limitLongStr(name, 30)}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item className={classes.details}>
                <DateIcon className={classes.icon} />
                {end_date || '-'}
              </Grid>
              <Grid item className={classes.details}>
                <PersonIcon className={classes.icon} />
                {User ? (
                  <Chip
                    avatar={<Avatar>{User.firstname[0]}</Avatar>}
                    label={`${User.firstname} ${User.lastname}`}
                    size="small"
                    variant="outlined"
                    color="primary"
                    clickable
                  />
                ) : <p>-</p>}
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
        <CardActions className={classes.action}></CardActions>
      </Card>
    </Grid>
  )
}
