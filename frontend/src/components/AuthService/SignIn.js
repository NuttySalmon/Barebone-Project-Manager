import React, { useState, useContext } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import FormContainer from '../../layout/FormContainer'
import Axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import { UserContext } from '.'

const textFieldAttrib = {
  fullWidth: true,
  margin: 'normal',
}

const SignIn = () => {
  let history = useHistory()
  let location = useLocation()
  let { setToken } = useContext(UserContext)
  let { from } = location.state || { from: { pathname: '/' } }
  const handleSubmit = async e => {
    e.preventDefault()
    const res = await Axios.post('/api/user/signin', { username, password })
    if (res.data.success) {
      setToken(res.data.token)
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
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  )
}

export default SignIn
