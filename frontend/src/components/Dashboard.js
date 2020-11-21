import React, { useContext, useEffect, useState } from 'react'
import { Add } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core'
import StoryCard from './StoryCard'
import DashboardCol from './DashboardCol'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { StoriesContext } from '../DataWrapper'

const useStyle = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(9),
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(9),
  },
  addButton: {
    position: 'fixed',
    right: theme.spacing(10),
    bottom: theme.spacing(5),
    color: theme.palette.primary.main,
    '& > *': {
      fontSize: 70,
      transition: 'all 0.2s',
      filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))',
      '&:hover': { fontSize: 72, color: theme.palette.primary.dark },
    },
  },
  colContainer: {
    minHeight: '80vh',
  },
}))
const colNames = ['Backlog', 'Ready', 'On Going', 'Completed']

const Dashboard = () => {
  // for loading when getting data
  const classes = useStyle()
  const { storiesCol, ready } = useContext(StoriesContext)

  /**
   * 
   * @param {number} statusNum 
   */
  const getStories = statusNum => {
    const storyArr = Object.values(storiesCol[statusNum])
    return storyArr.map(story => <StoryCard {...story} />)
  }

  const getCols = () => {
    return colNames.map((name, statusNum) => (
      <DashboardCol title={name} statusNum={statusNum} key={statusNum}>
        {getStories(statusNum)}
      </DashboardCol>
    ))
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="xl" className={classes.root}>
        <Box mb={2}>
          <Grid container alignItems="center">
            <div>
              <Typography color="primary" variant="h4" component="h1">
                Story Board
              </Typography>
            </div>
            <Link to="create">
              <Tooltip title="Add a new story" aria-label="add">
                <IconButton>
                  <Add />
                </IconButton>
              </Tooltip>
            </Link>
          </Grid>
        </Box>
        <Grid container direction="row" className={classes.colContainer}>
          {getCols()}
        </Grid>
        <Link to="signin"> Sign in </Link>
        <Link to="signup"> Sign up </Link>
      </Container>
    </DndProvider>
  )
}
export const DragItemTypes = {
  CARD: 'storycard',
}

export default Dashboard
