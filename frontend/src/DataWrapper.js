import Axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from './AuthService'

export const StoriesContext = createContext()
const DataWrapper = ({ children }) => {
  const { token, setSignOut, getAuthHeader } = useContext(UserContext)
  const [ready, setReady] = useState(false)
  const [frontendReady, setFrontendReady] = useState(false)
  const [APIReady, setAPIReady] = useState(false)
  const [stories, setStories] = useState({ 0: {}, 1: {}, 2: {}, 3: {} })
  const getStories = async () => {
    try {
      const result = await Axios.get('/api/story/all', getAuthHeader())
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
      if (error.response.status === 401) setSignOut()
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
      const res = await Axios.put(
        '/api/story/status-update',
        { id, status },
        getAuthHeader()
      )
      console.log(res)
    } catch (error) {
      if (error.response && error.response.status === 401) setSignOut()
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
      APIUpdateStoryStatus(id, newStatus) // update database
      delete newStories[status][id] // remove old value
      newStories[newStatus][id] = newStory // assign new value
      setFrontendReady(true)
      return newStories
    })
  }

  const updateStory = updatedStory => {
    setFrontendReady(false)
    APIUpdateStory(updatedStory)
    const { id, status } = updatedStory
    setStories(prev => {
      const newStories = { ...prev }
      delete newStories[status][id]
      setFrontendReady(true)
      newStories[status][id] = updatedStory
      return newStories
    })
  }

  const APIUpdateStory = async updatedStory => {
    const result = await Axios.put(
      `/api/story/update`,
      updatedStory,
      getAuthHeader()
    )
  }
  return (
    <StoriesContext.Provider
      value={{
        ready,
        stories,
        updateStoryStatus,
        updateStory,
      }}
    >
      {children}
    </StoriesContext.Provider>
  )
}

export default DataWrapper
