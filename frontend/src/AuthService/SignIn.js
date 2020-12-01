import React, { useState, useContext } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import FormContainer from '../layout/FormContainer'
import Axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import { UserContext } from '.'
import UILink from '../layout/UILink'

const textFieldAttrib = {
  fullWidth: true,
  margin: 'normal',
}

const SignIn = () => {
  const history = useHistory()
  const location = useLocation()
  const { setToken, setGlobalUsername } = useContext(UserContext)
  const { from } = location.state || { from: { pathname: '/' } }
  const handleSubmit = async e => {
    e.preventDefault()
    const res = await Axios.post('/api/user/signin', { username, password })
    if (res.data.success) {
      setToken(res.data.token)
      setGlobalUsername(username)
      history.push(from)
    }
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const onChangeUsername = e => {
    setUsername(e.target.value)
  }
  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  return (
    <FormContainer title="Sign in">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <TextField
              label="Username"
              value={username}
              onChange={onChangeUsername}
              {...textFieldAttrib}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={onChangePassword}
              {...textFieldAttrib}
            />
          </Grid>
          <Grid container item alignItems="center" spacing={1}>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
            <Grid item>
              <UILink to="/signup">or Click here to sign up</UILink>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  )
}

export default SignIn
