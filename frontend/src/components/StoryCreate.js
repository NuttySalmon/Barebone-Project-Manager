import React, { Component, useState } from 'react'
import { Button, makeStyles, Grid, TextField, Box } from '@material-ui/core'
import FormContainer from '../layout/FormContainer'
import { ArrowForward } from '@material-ui/icons'
import axios from 'axios'

const textFieldAttrib = {
  fullWidth: true,
  margin: 'normal',
}

const useStyles = makeStyles(theme => ({
  arrow: {
    height: '100%',
    paddingTop: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

const StoryCreate = () => {
  const classes = useStyles()
  const [storyData, setProjectData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    progress: '',
  })

  const handleSubmit = e => {
    e.preventDefault()
    console.log(storyData)
    axios.post('/api/story/create', { data: storyData })
  }

  const handleChange = (event, field) => {
    let value = event.target.value
    if (field === 'progress') {
      if (value > 100) value = 100
      if (value < 0) value = 0
    }
    setProjectData({
      ...storyData,
      [field]: value,
    })
  }

  return (
    <FormContainer title="New story">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <TextField
              {...textFieldAttrib}
              value={storyData.name}
              onChange={e => {
                handleChange(e, 'name')
              }}
              label="Story name"
            />
          </Grid>
          <Grid xs={12} container item>
            {/* Dates */}
            <Grid xs={12} md={9} container item spacing={2} alignItems="center">
              <Grid xs={12} md={5} item>
                <TextField
                  {...textFieldAttrib}
                  type="date"
                  value={storyData.start_date}
                  onChange={e => {
                    handleChange(e, 'start_date')
                  }}
                  label="Start date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid xs={0} md="auto" item>
                <ArrowForward className={classes.arrow} />
              </Grid>
              <Grid xs={12} md={5} item>
                <TextField
                  {...textFieldAttrib}
                  type="date"
                  value={storyData.end_date}
                  onChange={e => {
                    handleChange(e, 'end_date')
                  }}
                  label="End date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            {/* Progress */}
            <Grid xs={12} md={3} container item alignItems="center" spacing={1}>
              <Grid item xs={11}>
                <TextField
                  {...textFieldAttrib}
                  type="number"
                  value={storyData.progress}
                  onChange={e => {
                    handleChange(e, 'progress')
                  }}
                  label="Progress"
                />
              </Grid>
              <Grid xs={1} item>
                <Box pt={3} fontSize="15px">
                  %
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} item>
            <TextField {...textFieldAttrib} rows={5} multiline label="Details" />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  )
}
export default StoryCreate
