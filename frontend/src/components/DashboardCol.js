import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useDrop } from 'react-dnd'
import { DragItemTypes } from './Dashboard'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    borderWidth: 1,
    outline: '1px solid #cee0e6',
    backgroundColor: '#eff4f7',
    height: '100%',
    position: 'relative',
  },
  title: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
    opacity: 0.5,
    backgroundColor: 'white',
  },
}))
const DashboardCol = ({ children, title }) => {
  const [{ isOver }, drop] = useDrop({
    accept: DragItemTypes.CARD,
    drop: () => {
      console.log('dropped in', title)
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })
  const classes = useStyles()
  return (
    <Grid xs={12} md={3} item>
      <Grid container direction="column" className={classes.root}>
        <Grid item className={classes.title}>
          <Typography variant="h7">{title.toUpperCase()}</Typography>
        </Grid>
        <Grid
          container
          item
          direction="column"
          justify="flex-start"
          spacing={1}
          ref={drop}
        >
          {isOver && <div className={classes.overlay} />}
          {children}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DashboardCol
