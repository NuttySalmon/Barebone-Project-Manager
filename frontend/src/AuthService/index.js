import React, { useEffect, createContext, useState } from 'react'
import SignIn from './SignIn'
import SignOut from './SignOut'
import SignUp from './SignUp'
import { Route, Switch, useHistory } from 'react-router-dom'

export const UserContext = createContext()
const AuthService = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [username, setUsername] = useState(localStorage.getItem('username'))

  const history = useHistory()
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  useEffect(() => {
    localStorage.setItem('username', username)
  }, [username])

  /**
   * Sign out logic. Set token to empty string and remove move from local storage.
   * Finally redirect to sign in page
   */
  const setSignOut = () => {
    setToken('')
    setUsername('')
    localStorage.removeItem('token')
    history.push('/signin')
  }

  /**
   * Get authorization header to be used with Axio
   */
  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${token}` },
  })

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        setGlobalUsername: setUsername,
        username,
        setSignOut,
        getAuthHeader,
      }}
    >
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signout" component={SignOut} />
        {children}
      </Switch>
    </UserContext.Provider>
  )
}

export default AuthService
