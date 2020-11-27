import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@material-ui/core'
const UILink = ({ children, ...rest }) => {
  return (
    <Link component={RouterLink} {...rest}>
      {children}
    </Link>
  )
}

export default UILink
