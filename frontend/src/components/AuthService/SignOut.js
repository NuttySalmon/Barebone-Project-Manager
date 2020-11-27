import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '.'

const SignOut = () => {
  const history = useHistory()
  const { setSignOut } = useContext(UserContext)
  useEffect(setSignOut, [])

  return <div>Signing out...</div>
}

export default SignOut
