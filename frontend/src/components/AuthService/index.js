import React, { useEffect, createContext, useState } from 'react'
import SignIn from './SignIn'
import SignOut from './SignOut'
import SignUp from './SignUp'
import { Route, useHistory } from 'react-router-dom'

export const UserContext = createContext()
const AuthService = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const history = useHistory()
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])
  const setSignOut = () => {
    setToken('')
    localStorage.removeItem('token')
    history.push('/signin')
  }
  const getAuthHeader = () => ({ Authorization: `Bearer ${token}` })
  return (
    <UserContext.Provider value={{ token, setToken, setSignOut, getAuthHeader }}>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signout" component={SignOut} />
      {children}
    </UserContext.Provider>
  )
}

export default AuthService
