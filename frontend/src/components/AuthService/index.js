import React, { useEffect, createContext, useState } from 'react'
import SignIn from './SignIn'
import SignOut from './SignOut'
import SignUp from './SignUp'
import { Route } from 'react-router-dom'

export const UserContext = createContext()
const AuthService = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <UserContext.Provider value={{ token, setToken }}>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signout" component={SignOut} />
      {children}
    </UserContext.Provider>
  )
}

export default AuthService
