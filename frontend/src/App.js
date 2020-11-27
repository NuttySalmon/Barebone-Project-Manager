import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './layout/Navbar'
import AuthService from './AuthService'
import ProtectedRoute from './AuthService/ProtectedRoute'
import createProject from './components/StoryCreate'
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import theme from './theme'
import Dashboard from './components/Dashboard'
import DataWrapper from './DataWrapper'
import DataPages from './DataPages'

const useStyles = makeStyles(theme => ({
  content: {
    paddingTop: '64px',
  },
}))

const App = () => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <div className={classes.content}>
          <Switch>
            <AuthService>
              <ProtectedRoute
                exact
                path={['/story/*', '/']}
                component={DataPages}
              />
            </AuthService>
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
