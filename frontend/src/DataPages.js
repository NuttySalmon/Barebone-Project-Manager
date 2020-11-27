import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from './AuthService/ProtectedRoute'
import Dashboard from './components/Dashboard'
import StoryCreate from './components/StoryCreate'
import DataWrapper from './DataWrapper'
import NavBar from './layout/Navbar'

/**
 * All content will be under protected route with user data context provided.
 */
const DataPages = () => {
  return (
    <DataWrapper>
      <NavBar />
      <Route path="/story/create" component={StoryCreate} />
      <Route path="/" component={Dashboard} />
    </DataWrapper>
  )
}

export default DataPages
