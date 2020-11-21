import React, { useContext } from 'react'
import { Add } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  Grid,
  IconButton,
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
}))
const Dashboard = () => {
  // for loading when getting data
  const classes = useStyle()
  const storiesContext = useContext(StoriesContext)
  console.log(storiesContext.stories)
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
        <Grid container direction="row">
          <DashboardCol title="Backlog">
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
          </DashboardCol>
          <DashboardCol title="Ready">
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
          </DashboardCol>
          <DashboardCol title="On Going">
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
          </DashboardCol>
          <DashboardCol title="Completed">
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
          </DashboardCol>
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
