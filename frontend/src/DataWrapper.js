import Axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const StoriesContext = createContext()
const DataWrapper = ({ children }) => {
  const [ready, setReady] = useState(false)
  const [frontendReady, setFrontendReady] = useState(false)
  const [APIReady, setAPIReady] = useState(false)
  const [stories, setStories] = useState({ 0: {}, 1: {}, 2: {}, 3: {} })
  const getStories = async () => {
    try {
      const result = await Axios.get('/api/story/all')
      setAPIReady(true)
      console.log(result)
      let newStoriesCol = { 0: {}, 1: {}, 2: {}, 3: {} }
      result.data.forEach(story => {
        let { id, status } = story
        if (status === undefined || status === null || status > 3 || status < 0)
          status = 0
        newStoriesCol[status][id] = story
      })
      setStories(newStoriesCol)
      console.log(newStoriesCol)
    } catch (error) {
      console.error(error)
    } finally {
      setFrontendReady(true)
      setAPIReady(true)
    }
  }

  // trigger get data when refresh
  useEffect(() => {
    getStories()
  }, [])

  useEffect(() => {
    setReady(frontendReady && APIReady)
  }, [frontendReady, APIReady])
  /**
   * Update story status API call
   * @param {number} id - unique story id for story to update
   * @param {number} status - new status of story
   */
  const APIUpdateStoryStatus = async (id, status) => {
    setAPIReady(false)
    try {
      Axios.put('/api/story/status-update', { data: { id, status } })
    } catch (error) {
      console.error(error)
    } finally {
      setAPIReady(true)
    }
  }

  /**
   * Update single story and handle drag and drop changes
   * @param {number} id  - unique story id for story to update
   * @param {number} status - current status number
   * @param {*} newStatus - new status value to change to
   */
  const updateStoryStatus = (id, status, newStatus) => {
    setFrontendReady(false)
    setStories(prev => {
      const newStory = prev[status][id] // make copy of original data
      if (!newStory) {
        setFrontendReady(true)
        return prev // return original data if not found
      }
      newStory.status = newStatus // change value
      const newStories = { ...prev } // copy previous stories
      APIUpdateStoryStatus(id, status) // update database
      delete newStories[status][id] // remove old value
      newStories[newStatus][id] = newStory // assign new value
      setFrontendReady(true)
      return newStories
    })
  }
  return (
    <StoriesContext.Provider value={{ ready, stories, updateStoryStatus }}>
      {children}
    </StoriesContext.Provider>
  )
}

export default DataWrapper
