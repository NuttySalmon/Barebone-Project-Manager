import Axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const StoriesContext = createContext()
const DataWrapper = ({ children }) => {
  const [ready, setReady] = useState(false)
  const [stories, setStories] = useState([])
  const getStories = async () => {
    const result = await Axios.get('/api/story/all')
    setStories(result.data)
    console.log(result)
    setReady(true)
  }
  useEffect(() => {
    getStories()
  }, [])
  return (
    <StoriesContext.Provider value={{ stories, ready }}>
      {children}
    </StoriesContext.Provider>
  )
}

export default DataWrapper
