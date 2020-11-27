import React, { useState } from 'react'
import { Button, TextField, Grid } from '@material-ui/core'
import FormContainer from '../layout/FormContainer'
import UILink from '../layout/UILink'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

const textFieldAttrib = {
  fullWidth: true,
  margin: 'normal',
}
const SignUp = () => {
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await Axios.post('/api/user/signup', userInfo)
      history.push('/signin')
    } catch (error) {
      console.warn(error)
    }
  }
  const [userInfo, setUserInfo] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
  })

  const handleOnChange = (event, field) => {
    setUserInfo({ ...userInfo, [field]: event.target.value })
  }

  return (
    <FormContainer title="Sign Up">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6} item>
            <TextField
              label="First name"
              value={userInfo.firstname}
              onChange={e => {
                handleOnChange(e, 'firstname')
              }}
              {...textFieldAttrib}
            />
          </Grid>
          <Grid xs={12} md={6} item>
            <TextField
              label="Last name"
              value={userInfo.lastname}
              onChange={e => {
                handleOnChange(e, 'lastname')
              }}
              {...textFieldAttrib}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              label="Pick a username"
              value={userInfo.username}
              onChange={e => {
                handleOnChange(e, 'username')
              }}
              {...textFieldAttrib}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              type="password"
              value={userInfo.password}
              onChange={e => {
                handleOnChange(e, 'password')
              }}
              label="Enter password"
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
              <UILink to="/signin">or Click here to sign in</UILink>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  )
}

export default SignUp
