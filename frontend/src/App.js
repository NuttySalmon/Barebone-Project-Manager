import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './layout/Navbar'
import SignIn from './components/authorization/SignIn'
import SignUp from './components/authorization/SignUp'
import createProject from './components/StoryCreate'
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import theme from './theme'
import Dashboard from './components/Dashboard'
import DataWrapper from './DataWrapper'

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
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <DataWrapper>
              <Navbar />
              <Route path="/create" component={createProject} />
              <Route exact path="/" component={Dashboard} />
            </DataWrapper>
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
