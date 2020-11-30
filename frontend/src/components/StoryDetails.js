import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { UserContext } from '../AuthService'
import { StoriesContext } from '../DataWrapper'
import NewTask from './NewTask'
import StoryForm from './StoryForm'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5),
    marginTop: theme.spacing(5),
    height: '600px',
    minHeight: 'fit-content',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: { height: '100%' },
  },
}))
const StoryDetails = () => {
  const classes = useStyles()
  const { id: storyId } = useParams()
  const [storyData, setProjectData] = useState({
    id: storyId,
    name: '',
    start_date: '',
    end_date: '',
    progress: '',
    Tasks: [],
  })
  const { getAuthHeader, setApiReady } = useContext(UserContext)
  const { updateStoryFrontend } = useContext(StoriesContext)
  const history = useHistory()

  const getStory = async () => {
    const result = await Axios.get(
      `/api/story/details/?id=${storyId}`,
      getAuthHeader()
    )
    const {
      name,
      start_date,
      end_date,
      progress,
      status,
      id,
      Tasks,
    } = result.data
    console.log(result.data)
    setProjectData({
      id,
      name,
      start_date,
      end_date,
      progress,
      status,
      Tasks,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    updateStoryFrontend(storyData)

    history.push('/')
  }

  const handleChange = (event, field) => {
    let value = event.target.value
    if (field === 'progress') {
      if (value > 100) value = 100
      if (value < 0) value = 0
    }
    setProjectData({ ...storyData, [field]: value })
  }

  const storyAddTask = (newTask)=>{
    setProjectData({
      ...storyData,
      Tasks: [
        ...Tasks,
        newTask
      ]
    })
  }

  useEffect(() => {
    getStory()
  }, [])
  return (
    <Container>
      <Paper className={classes.root}>
        <Grid container spacing={5}>
          <Grid xs={2} sm={8} item>
            <StoryForm
              {...{ storyData, handleChange, handleSubmit }}
              buttonText="Update"
            />
          </Grid>
          <Grid xs={6} sm={4} item>
            <Typography variant="h6">Tasks </Typography>
            <NewTask storyAddTask={storyAddTask} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default StoryDetails
