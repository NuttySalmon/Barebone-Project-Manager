import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './layout/Navbar'
import SignIn from './components/authorization/SignIn'
import SignUp from './components/authorization/SignUp'
import createProject from './components/StoryCreate'
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import theme from './theme'
import Dashboard from './components/Dashboard'

const useStyles = makeStyles(theme => ({
  content: {
    paddingTop: '64px',
  },
}))

const App = () => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
          <Navbar />
          <div className={classes.content}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create" component={createProject} />
          </Switch>
          </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
