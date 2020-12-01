import { Box, Button, Grid, makeStyles, TextField } from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons'
import React from 'react'

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

const StoryForm = ({
  handleSubmit,
  handleChange,
  storyData,
  buttonText = 'create',
}) => {
  const classes = useStyles()
  return (
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
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid md="auto" item>
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
        <Grid xs={4} item>
          <TextField
            {...textFieldAttrib}
            value={storyData.assigned}
            onChange={e => {
              handleChange(e, 'assigned')
            }}
            label="Assigned"
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            {...textFieldAttrib}
            value={storyData.details}
            onChange={e => {
              handleChange(e, 'details')
            }}
            rows={5}
            multiline
            label="Details"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default StoryForm
