import { Box, Container, Link, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

const NotFound = () => {
  const history = useHistory()

  return (
    <Container>
      <Paper>
        <Box padding={4}>
          <Typography variant="h2" gutterBottom color="primary">
            Oops! <br />
          </Typography>
          <Typography variant="h4" gutterBottom>
            This page doesn&apos;t exist.
          </Typography>
          <Typography variant="h5">
            <Link
              href="#"
              onClick={e => {
                e.preventDefault()
                history.goBack()
              }}
            >
              Go Back?
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default NotFound
