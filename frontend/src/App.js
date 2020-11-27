import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import AuthService from './AuthService'
import ProtectedRoute from './AuthService/ProtectedRoute'
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import theme from './theme'
import DataPages from './DataPages'
import NotFound from './components/NotFound'

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

      <div className={classes.content}>
        <BrowserRouter>
          <AuthService>
            <ProtectedRoute
              exact
              path={['/story/*', '/']}
              component={DataPages}
            />
            <Route path="*" component={NotFound} />
          </AuthService>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
