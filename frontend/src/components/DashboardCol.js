import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    borderWidth: 1,
    outline: "1px solid #cee0e6",
    backgroundColor: '#eff4f7',
    height: "100%",
  },
  title: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1),
  },
}))
const DashboardCol = ({ children, title }) => {
  const classes = useStyles()
  return (
    <Grid xs={12} md={3} item>
      <Grid container direction="column" className={classes.root}>
        <Grid item className={classes.title}>
          <Typography variant="h7">{title.toUpperCase()}</Typography>
        </Grid>
        <Grid container item direction="column" justify='flex-start' spacing={1}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DashboardCol
