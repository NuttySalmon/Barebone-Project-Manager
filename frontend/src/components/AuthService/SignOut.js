import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '.'

const SignOut = () => {
  const history = useHistory()
  const {setToken} = useContext(UserContext)
  useEffect(() => {
    setToken('')
    history.push('/signin')
  }, [])

  return <div>Signing out...</div>
}

export default SignOut
