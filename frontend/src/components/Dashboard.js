import React from 'react'
import { AddCircle } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { Container, Grid } from '@material-ui/core'
const Dashboard = () => {
  return (
    <Container>
      <Grid container direction="column">
        <Grid item>
          <h1>Dashboard placeholder</h1>
        </Grid>
        <Grid item>
          <Link to="create">
            <AddCircle color="secondary" />
          </Link>
        </Grid>
        <Grid item>
          <Link to="signin"> Sign in </Link>
        </Grid>
        <Grid item>
          <Link to="signup"> Sign up </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
