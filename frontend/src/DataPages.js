import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import StoryCreate from './components/StoryCreate'
import StoryDetails from './components/StoryDetails'
import DataWrapper from './DataWrapper'
import NavBar from './layout/Navbar'

/**
 * All content will be under protected route with user data context provided.
 */
const DataPages = () => {
  return (
    <DataWrapper>
      <NavBar />
      <Switch>
        <Route path="/story/create" component={StoryCreate} />
        <Route path="/story/details/:id" component={StoryDetails} />
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </DataWrapper>
  )
}

export default DataPages
