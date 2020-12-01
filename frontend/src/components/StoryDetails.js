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
import TaskList from './TaskList'
import StoryForm from './StoryForm'

/**
 * Order tasks such that completed tasks are after on going
 * @param {object[]} tasks
 */
const orderTasks = tasks => {
  const completedTasks = []
  const onGoingTasks = []
  tasks.forEach(task => {
    if (task.complete) completedTasks.push(task)
    else onGoingTasks.push(task)
  })
  return [...onGoingTasks, ...completedTasks]
}

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
  const [storyData, setStoryData] = useState({
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

    setStoryData({
      id,
      name,
      start_date,
      end_date,
      progress,
      status,
      Tasks: orderTasks(Tasks),
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    updateStoryFrontend(storyData)

    history.push('/')
  }

  const toggleTaskComplete = async id => {
    let newValue
    setStoryData(prev => {
      const updatedTaskList = prev.Tasks.map(task => {
        if (task.id === id) {
          task.complete = !task.complete
          newValue = task.complete
        }
        return task
      })
      return { ...prev, Tasks: orderTasks(updatedTaskList) }
    })
    const res = await Axios.put(
      '/api/task/update',
      { id, complete: newValue },
      getAuthHeader()
    )
    if (res.status === 401) history.push('/signout')
  }

  const handleChange = (event, field) => {
    let value = event.target.value
    if (field === 'progress') {
      if (value > 100) value = 100
      if (value < 0) value = 0
    }
    setStoryData({ ...storyData, [field]: value })
  }

  const deleteTask = async id => {
    setStoryData(prev => {
      const updatedTaskList = prev.Tasks.filter(t => t.id !== id)
      return { ...prev, Tasks: updatedTaskList }
    })
    const res = await Axios.delete(`/api/task/delete?id=${id}`,getAuthHeader())
    if (res.status === 401) history.push('/signout')
  }

  const storyAddTask = async name => {
    const result = await Axios.post(
      '/api/task/create',
      { storyId, name: name },
      getAuthHeader()
    )

    if (result.status === 401) history.push('/signout')
    setStoryData(prev => ({
      ...prev,
      Tasks: [...prev.Tasks, result.data],
    }))
  }

  useEffect(() => {
    getStory()
  }, [])
  return (
    <Container>
      <Paper className={classes.root}>
        <Grid container spacing={5}>
          <Grid xs={12} sm={8} item>
            <StoryForm
              {...{ storyData, handleChange, handleSubmit }}
              buttonText="Update"
            />
          </Grid>
          <Grid xs={12} sm={4} direction="column" container item>
            <Grid item>
              <Typography variant="h6">Tasks </Typography>
              <NewTask storyAddTask={storyAddTask} />
            </Grid>
            <Grid item>
              <TaskList
                tasks={storyData.Tasks}
                toggleTaskComplete={toggleTaskComplete}
                deleteTask={deleteTask}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default StoryDetails
