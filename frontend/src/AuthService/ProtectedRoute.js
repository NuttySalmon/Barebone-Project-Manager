import React from 'react'
import { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from '.'

const ProtectedRoute = ({ component: C, ...rest }) => {
  const { token } = useContext(UserContext)
  const handleRedirect = ({ location }) =>
    token ? (
      <C />
    ) : (
      <Redirect to={{ pathname: '/signin', state: { from: location } }} />
    )
  return <Route {...rest} render={handleRedirect} />
}

export default ProtectedRoute
