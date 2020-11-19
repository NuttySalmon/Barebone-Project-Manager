import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {
  SettingsOutlined as SettingsIcon,
  Event as DateIcon,
  Person as PersonIcon,
} from '@material-ui/icons'
import { Box, Chip, Grid, IconButton } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
  root: {
    // border: '2px solid black',
    // minWidth: 275,
    // width: 200
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
}))

export default function StoryCard() {
  const classes = useStyles()
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Grid item>
      <Card elevation={3} className={classes.root}>
        <IconButton size="small" className={classes.button}>
          <SettingsIcon style={{ width: 20 }} />
        </IconButton>
        <CardContent>
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
                label="John Doe"
                size="small"
                variant="outlined"
                color="primary"
              />
            </Grid>
          </Typography>
        </CardContent>
        <CardActions className={classes.action}></CardActions>
      </Card>
    </Grid>
  )
}
